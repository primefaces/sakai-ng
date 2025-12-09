import { Injectable, inject, signal, computed } from '@angular/core';
import { MGA, FilterCriteria, StrategyRule, RecommendationResult } from '../models/carrier.model';
import { KnowledgeBaseService } from './knowledge-base.service';

@Injectable({
    providedIn: 'root'
})
export class MarketService {
    private kbService = inject(KnowledgeBaseService);

    // Filter state
    filterCriteria = signal<FilterCriteria>({
        driverAge: null,
        cargoType: null,
        hasDashCam: false,
        vehicleYear: null,
        yearsInBusiness: null,
        state: null,
        vehicleType: null
    });

    // Compute MGAs (The Market List)
    markets = computed<MGA[]>(() => {
        return this.kbService.markets();
    });

    // Strategy Signal
    recommendations = computed<RecommendationResult>(() => {
        const criteria = this.filterCriteria();
        const allMarkets = this.markets();
        const strategy = this.kbService.strategy();

        // If no cargo type selected, show ALL MGAs in "others" for reference/directory
        if (!criteria.cargoType) {
            return { recommended: [], others: allMarkets, ineligible: [] };
        }

        // 1. Identify Strategy Configuration
        const tenureKey = this.getTenureKey(criteria.yearsInBusiness || 0);
        const cargoKey = criteria.cargoType;

        let strategyRule: StrategyRule | null = null;
        if (strategy[cargoKey] && strategy[cargoKey][tenureKey]) {
            strategyRule = strategy[cargoKey][tenureKey];
        }

        const recommended: MGA[] = [];
        const others: MGA[] = [];
        const ineligible: { market: MGA; reason: string }[] = [];

        // 2. Validate Helper
        const validate = (mga: MGA) => this.checkHardRules(mga, criteria);

        // 3. Process Markets
        allMarkets.forEach(mga => {
            const validation = validate(mga);

            if (validation.passed) {
                // Check if this MGA matches the strategy
                const matchType = this.getStrategyMatch(mga, strategyRule);

                // Dynamic Tier & Recommendation Logic
                if (matchType === 'PRIMARY') {
                    mga.recommendationTag = 'PREFERRED CHOICE';
                    mga.recommendationNotes = strategyRule?.notes || 'Top Tier Market for this profile.';
                    mga.tier = 'TIER 1'; // Dynamic Override
                    recommended.push(mga);
                } else if (matchType === 'SECONDARY') {
                    mga.recommendationTag = 'ALTERNATIVE CHOICE';
                    mga.recommendationNotes = 'Good alternative market.';
                    mga.tier = 'TIER 2'; // Dynamic Override
                    recommended.push(mga);
                } else {
                    // Fallback Tier Logic based on Type/Risk if not matched in strategy
                    if (mga.type === 'RRG' || mga.riskLevel === 'HIGH_RISK') {
                        mga.tier = 'TIER 3';
                        mga.recommendationTag = 'HIGH RISK';
                    } else if (mga.tier === 'TIER 1') {
                        // If JSON says Tier 1 but not in strategy, maybe downgrade or keep?
                        // Let's keep JSON value but no special tag
                    }

                    mga.recommendationNotes = undefined;
                    others.push(mga);
                }
            } else {
                ineligible.push({ market: mga, reason: validation.reason });
            }
        });

        // Sort recommended: Primary first
        recommended.sort((a, b) => {
            if (a.recommendationTag === 'PREFERRED CHOICE') return -1;
            if (b.recommendationTag === 'PREFERRED CHOICE') return 1;
            return 0;
        });

        return { recommended, others, ineligible };
    });

    // Legacy Filter Logic Helper (for compatibility)
    filteredMarkets = computed(() => {
        const recs = this.recommendations();
        return [...recs.recommended, ...recs.others];
    });

    // --- LOGIC ---

    /**
     * Determines if an MGA is a Primary or Secondary match based on the strategy.
     * Checks MGA ID and its Carriers' IDs.
     */
    private getStrategyMatch(mga: MGA, rule: StrategyRule | null): 'PRIMARY' | 'SECONDARY' | 'NONE' {
        if (!rule) return 'NONE';

        // Helper to check if ID matches
        const matchesId = (targetIds: string[]) => {
            if (!targetIds) return false;
            // Check MGA ID (normalize)
            if (targetIds.some(id => mga.id.toLowerCase().includes(id.toLowerCase()))) return true;
            // Check MGA Name
            if (targetIds.some(id => mga.name.toLowerCase().includes(id.replace("_", " ").toLowerCase()))) return true;

            // Check Carriers (The new hierarchy)
            if (mga.carriers && mga.carriers.length > 0) {
                if (mga.carriers.some(c => targetIds.some(tid => c.id.toLowerCase().includes(tid.toLowerCase())))) return true;
            }
            return false;
        };

        if (matchesId(rule.primary)) return 'PRIMARY';
        if (matchesId(rule.secondary)) return 'SECONDARY';

        return 'NONE';
    }

    private checkHardRules(mga: MGA, criteria: FilterCriteria): { passed: boolean; reason: string } {
        const currentYear = new Date().getFullYear();
        const reqs = mga.requirements;
        const appetite = mga.appetite || {};

        // 1. Cargo Appetite Strict
        // Map criteria.cargoType to appetite keys
        const cargoMap: { [key: string]: string } = {
            'FLATBED': 'flatbed',
            'DRY_VAN': 'dryVan',
            'REEFER': 'reefer',
            'CAR_HAULER': 'autoHauler',
            'SAND_GRAVEL': 'sandGravel',
            'FRAC_SAND': 'sandGravel',
            'AUTO_LIABILITY': 'autoLiability',
            'PHYSICAL_DAMAGE': 'physicalDamage',
            'CARGO': 'cargo',
            'TOWING': 'towing',
            'HOTSHOT': 'flatbed', // Approximation
            'INTERMODAL': 'intermodal',
            'LOGGING': 'logging',
            'DUMP': 'sandGravel'
        };

        if (criteria.cargoType) {
            const mappedKey = cargoMap[criteria.cargoType];
            if (mappedKey && appetite[mappedKey] === false) {
                return { passed: false, reason: `Does not write ${criteria.cargoType}` };
            }
        }

        // 2. Driver Age
        if (criteria.driverAge !== null) {
            const min = reqs.minDriverAge || 21;
            const max = reqs.maxDriverAge; // Undefined = no max
            if (criteria.driverAge < min) return { passed: false, reason: `Min driver age ${min}` };
            if (max && criteria.driverAge > max) return { passed: false, reason: `Max driver age ${max}` };
        }

        // 3. Dash Cam
        if (criteria.hasDashCam === false && reqs.requiresDashCam) {
            return { passed: false, reason: 'Requires Dash Cam' };
        }

        // 4. Vehicle Year
        if (criteria.vehicleYear !== null) {
            const age = currentYear - criteria.vehicleYear;
            if (reqs.maxVehicleAge && age > reqs.maxVehicleAge) return { passed: false, reason: `Vehicle too old (Max ${reqs.maxVehicleAge} yrs)` };
            // Some might have minVehicleYear
        }

        // 5. Years In Business
        if (criteria.yearsInBusiness !== null) {
            // New Venture Check
            if (criteria.yearsInBusiness < 1) { // 0 years
                // Check if logic exists
                if (mga.newVentureFit === 'No' || (reqs.newVenturesAccepted === false)) {
                    return { passed: false, reason: 'No New Ventures' };
                }
            }
            // Min Exp
            /*
            if (reqs.minYearsInBusiness && criteria.yearsInBusiness < reqs.minYearsInBusiness) {
                 return { passed: false, reason: `Min ${reqs.minYearsInBusiness} years in business` };
            }
            */
        }

        // 6. State
        /*
        if (criteria.state) {
           // Complex state logic if needed
        }
        */

        return { passed: true, reason: '' };
    }

    validateAudit(mga: MGA, answers: Record<string, any>): { passed: boolean; error?: string } {
        if (!mga.auditQuestions || mga.auditQuestions.length === 0) return { passed: true };

        for (const q of mga.auditQuestions) {
            const userAnswer = answers[q.id];
            // If question has a triggerAnswer (e.g. true for "Do you haul Hazmat?")
            // and user answered that value, then FAIL.
            if (userAnswer === q.triggerAnswer) {
                return { passed: false, error: q.failureMessage };
            }
        }
        return { passed: true };
    }

    private getTenureKey(years: number): string {
        if (years < 1) return 'NEW_VENTURE';
        if (years === 1) return '1_YEAR';
        if (years === 2) return '2_YEARS';
        return '3_YEARS_PLUS';
    }

    // Options Signals
    cargoTypeOptions = computed(() => {
        const comms = this.kbService.commodities();
        return comms.map(c => ({ label: c.label, value: c.id })).sort((a, b) => a.label.localeCompare(b.label));
    });

    vehicleTypeOptions = computed(() => {
        const types = this.kbService.vehicleTypes();
        return types.map(t => ({ label: t.label, value: t.id }));
    });

    stateOptions = computed(() => {
        const states = this.kbService.usStates();
        return states.map(s => ({ label: `${s.name} (${s.code})`, value: s.code }));
    });

    // Bridge methods
    getCargoTypes() { return this.cargoTypeOptions; }
    getVehicleTypes() { return this.vehicleTypeOptions; }
    getStates() { return this.stateOptions; }

    updateFilter(key: keyof FilterCriteria, value: any) {
        this.filterCriteria.update(current => ({
            ...current,
            [key]: value
        }));
    }

    clearFilters(): void {
        this.filterCriteria.set({
            driverAge: null,
            cargoType: null,
            hasDashCam: false,
            vehicleYear: null,
            yearsInBusiness: null,
            state: null,
            vehicleType: null
        });
    }
}
