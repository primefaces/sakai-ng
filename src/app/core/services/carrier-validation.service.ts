import { Injectable, inject } from '@angular/core';
import { KnowledgeBaseService } from './knowledge-base.service';
import { RiskProfile, ValidationResult, FailedCheck } from '../models/risk-profile.model';
import { MGA } from '../models/carrier.model';

@Injectable({ providedIn: 'root' })
export class CarrierValidationService {
    private kbService = inject(KnowledgeBaseService);

    validate(profile: RiskProfile): ValidationResult[] {
        const markets = this.kbService.markets();

        return markets.map(market => this.evaluateMarket(market, profile))
            .sort((a, b) => {
                // Sort Eligible first, then Warning, then Knockout
                const rank = { 'eligible': 0, 'warning': 1, 'knockout': 2 };
                return rank[a.status] - rank[b.status];
            }) as ValidationResult[];
    }

    private evaluateMarket(market: MGA, profile: RiskProfile): ValidationResult {
        const passedChecks: string[] = [];
        const failChecks: FailedCheck[] = [];
        let status: 'eligible' | 'knockout' | 'warning' = 'eligible';

        // 1. New Venture Check
        if (market.requirements.newVenturesAccepted === false) {
            const years = profile.businessInfo.yearsInBusiness || 0;
            if (years < 2) {
                failChecks.push({ questionId: 'new_venture', question: 'Years in Business', reason: 'Market does not accept New Ventures (< 2 years)', category: 'knockout' });
                status = 'knockout';
            } else {
                passedChecks.push(`New Ventures Accepted (Years in business: ${years})`);
            }
        } else {
            passedChecks.push('New Ventures Accepted');
        }

        // 2. Driver Checks
        // We aggregate findings. Any failure flags the whole check as failed.
        let driverAgeCheck = true;
        let driverExpCheck = true;

        for (const driver of profile.drivers) {
            let age = driver.age || 0;
            const exp = driver.yearsExperience || 0;

            if (market.requirements.minDriverAge && age < market.requirements.minDriverAge) {
                failChecks.push({ questionId: 'age', question: 'Minimum Driver Age', reason: `Driver ${driver.name} (${age}) < ${market.requirements.minDriverAge}`, category: 'knockout' });
                driverAgeCheck = false;
                status = 'knockout';
            }

            if (market.requirements.maxDriverAge && age > market.requirements.maxDriverAge) {
                failChecks.push({ questionId: 'max_age', question: 'Maximum Driver Age', reason: `Driver ${driver.name} (${age}) > ${market.requirements.maxDriverAge}`, category: 'knockout' });
                driverAgeCheck = false;
                status = 'knockout';
            }

            if (market.requirements.minCdlExperience && exp < market.requirements.minCdlExperience) {
                failChecks.push({ questionId: 'exp', question: 'Minimum CDL Experience', reason: `Driver ${driver.name} (${exp} yrs) < ${market.requirements.minCdlExperience}`, category: 'knockout' });
                driverExpCheck = false;
                status = 'knockout';
            }
        }

        if (driverAgeCheck && market.requirements.minDriverAge) {
            passedChecks.push(`Min Driver Age: ${market.requirements.minDriverAge} (Passed)`);
        }
        if (driverExpCheck && market.requirements.minCdlExperience) {
            passedChecks.push(`Min CDL Experience: ${market.requirements.minCdlExperience} years (Passed)`);
        }

        // 3. Commodity Exclusions
        if (market.excludedCargo) {
            const hasExcluded = profile.operations.cargoCommodities.some(c => market.excludedCargo?.includes(c));
            if (hasExcluded) {
                const found = profile.operations.cargoCommodities.filter(c => market.excludedCargo?.includes(c));
                failChecks.push({ questionId: 'cargo', question: 'Acceptable Cargo', reason: `Market excludes: ${found.join(', ')}`, category: 'knockout' });
                status = 'knockout';
            } else {
                passedChecks.push('Cargo Commodities Accepted');
            }
        }

        // 4. Vehicle Age
        if (market.requirements.maxVehicleAge) {
            const currentYear = new Date().getFullYear();
            const oldestAllowed = currentYear - market.requirements.maxVehicleAge;
            let vehicleAgeCheck = true;
            for (const v of profile.vehicles) {
                if (v.year && v.year < oldestAllowed) {
                    failChecks.push({ questionId: 'vehicle_age', question: 'Max Vehicle Age', reason: `Unit ${v.year} is older than ${market.requirements.maxVehicleAge} years`, category: 'knockout' });
                    vehicleAgeCheck = false;
                    status = 'knockout';
                }
            }
            if (vehicleAgeCheck) {
                passedChecks.push(`Max Vehicle Age: ${market.requirements.maxVehicleAge} years (Passed)`);
            }
        }

        // 5. Operating Radius
        if (market.requirements.operatingRadius) {
            const radiusLimit = market.requirements.operatingRadius;
            const profileRadius = profile.businessInfo.operatingRadius || 500;
            if (profileRadius > radiusLimit) {
                failChecks.push({ questionId: 'radius', question: 'Max Operating Radius', reason: `Radius ${profileRadius} > ${radiusLimit}`, category: 'knockout' });
                status = 'knockout';
            } else {
                passedChecks.push(`Operating Radius within limits (${radiusLimit} miles)`);
            }
        }

        // 6. Dash Cam Check
        if (market.requirements.requiresDashCam) {
            if (profile.willingToInstallDashCam === false) {
                failChecks.push({ questionId: 'dashcam', question: 'Dash Cam Required', reason: 'You indicated unavailability to install Dash Cams', category: 'knockout' });
                status = 'knockout';
            } else {
                passedChecks.push('Dash Cam Requirement Met');
            }
        }

        // 7. Prior Insurance Check
        if (market.requirements.priorInsurance) {
            const req = market.requirements.priorInsurance;
            if (!profile.hasPriorInsurance || (profile.priorInsuranceYears || 0) < req) {
                const acts = profile.priorInsuranceYears || 0;
                failChecks.push({ questionId: 'prior_ins', question: 'Prior Insurance', reason: `Requires ${req} Years (Has ${acts})`, category: 'knockout' });
                status = 'knockout';
            } else {
                passedChecks.push(`Prior Insurance Requirements Met (${req}+ years)`);
            }
        }

        // 8. Loss History Check
        const lossCheck = this.validateLossHistory(market, profile);
        if (lossCheck.failed) {
            failChecks.push(...lossCheck.errors);
            status = 'knockout';
        } else {
            passedChecks.push(...lossCheck.passed);
        }

        // 9. Address Check (Mailing vs Garaging)
        const addressCheck = this.validateAddressDistance(market, profile);
        if (!addressCheck.passed) {
            failChecks.push({
                questionId: 'address_mismatch',
                question: 'Address Verification',
                reason: addressCheck.reason,
                category: 'warning'
            });
            // We set status to warning, unless it's already knockout
            if (status !== 'knockout') status = 'warning';
        } else if (addressCheck.passed && addressCheck.reason) {
            passedChecks.push(addressCheck.reason);
        }

        // Calculate Score
        const totalChecks = passedChecks.length + failChecks.length;
        const score = totalChecks > 0 ? Math.round((passedChecks.length / totalChecks) * 100) : 100;

        return {
            carrierId: market.id,
            carrierName: market.name,
            status: status,
            score: status === 'eligible' ? score : 0,
            passedChecks: passedChecks,
            failedChecks: failChecks,
            submittable: status === 'eligible',
            marketData: {
                ...market,
                distributedCarriers: market.carriers || []
            }
        } as ValidationResult;
    }

    private validateLossHistory(market: MGA, profile: RiskProfile): { failed: boolean, errors: FailedCheck[], passed: string[] } {
        const errors: FailedCheck[] = [];
        const passed: string[] = [];
        const losses = profile.lossHistory || [];
        const reqs = market.requirements;

        // Date Filter: Only consider last 3 years? 
        // For now, let's assume the user only entered relevant 3 year history as instructed.

        const openLosses = losses.filter(l => l.status === 'Open');

        // Rule: No Open Losses (Common MGA Rule)
        // If strictly required or implied by notes. We default to 'Flagging' if open losses exist unless 'allowOpenLosses' is true.
        const allowOpen = reqs.allowOpenLosses === true;

        if (!allowOpen && openLosses.length > 0) {
            errors.push({
                questionId: 'open_claims',
                question: 'Open Claims',
                reason: `Market generally rejects Open Claims (${openLosses.length} found: ${openLosses.map(l => l.type).join(', ')})`,
                category: 'knockout'
            });
            return { failed: true, errors, passed };
        }

        // Rule: Max Total Losses
        if (reqs.maxLossCount !== undefined && losses.length > reqs.maxLossCount) {
            errors.push({
                questionId: 'loss_count',
                question: 'Loss Frequency',
                reason: `Loss count (${losses.length}) exceeds market max of ${reqs.maxLossCount}`,
                category: 'knockout'
            });
            return { failed: true, errors, passed };
        }

        // Rule: Specific Loss Types (e.g. No Cargo Losses)
        if (reqs.noCargoLosses && losses.some(l => l.type === 'Cargo')) {
            errors.push({
                questionId: 'loss_type_cargo',
                question: 'Cargo Loss',
                reason: `Market refuses records with Cargo Losses`,
                category: 'knockout'
            });
            return { failed: true, errors, passed };
        }

        if (losses.length === 0) {
            passed.push('No Loss History (Clean Record)');
        } else {
            passed.push(`Loss History Acceptable (${losses.length} records)`);
        }

        return { failed: false, errors, passed };
    }

    private validateAddressDistance(market: MGA, profile: RiskProfile): { passed: boolean, reason: string } {
        const garaging = profile.businessInfo.garagingAddress;
        const mailing = profile.businessInfo.mailingAddress;

        if (!mailing || !mailing.zip || (garaging.zip === mailing.zip && garaging.street === mailing.street)) {
            return { passed: true, reason: 'Addresses Match' };
        }

        // If states differ - Major Flag
        if (garaging.state !== mailing.state) {
            return { passed: false, reason: `Garaging State (${garaging.state}) != Mailing State (${mailing.state}). This often triggers declination or referral.` };
        }

        // If City/Zip differ
        // We warn about distance rules.
        if (garaging.zip !== mailing.zip) {
            // If we had coordinates, we would calculate distance here.
            return { passed: false, reason: `Mailing Zip (${mailing.zip}) differs from Garaging (${garaging.zip}). Verify distance requirements (< 50-100 miles typical).` };
        }

        return { passed: true, reason: 'Addresses Proximity Acceptable' };
    }
}


