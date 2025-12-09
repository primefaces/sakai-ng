// Enhanced MGA & Carrier Models for Single Source of Truth

export interface MGA {
    id: string;
    name: string;
    type: string;
    submissionEmail: string;
    website?: string;
    phone?: string;
    tier: string;
    riskLevel: 'HIGH_RISK' | 'NORMAL';
    retention: string;

    // Inferred Coverages
    coverages: {
        al: boolean;
        pd: boolean;
        mtc: boolean;
        gl: boolean;
    };

    // Detailed Appetite (for filtering)
    appetite: {
        autoLiability: boolean;
        physicalDamage: boolean;
        cargo: boolean;
        generalLiability: boolean;
        trailerInterchange: boolean;
        reefer: boolean;
        flatbed: boolean;
        dryVan: boolean;
        sandGravel: boolean;
        autoHauler: boolean;
        intermodal: boolean;
        [key: string]: boolean;
    };

    // Requirements (for validation)
    requirements: {
        minDriverAge: number;
        minCdlExperience: number;
        maxDriverAge?: number;
        maxVehicleAge?: number;
        minVehicleYear?: number;
        minYearsInBusiness?: number;
        newVenturesAccepted?: boolean;
        requiresDashCam?: boolean;
        operatingRadius?: number;
        priorInsurance?: number; // Years required
        allowOpenLosses?: boolean;
        maxLossCount?: number;
        noCargoLosses?: boolean;
        notes: string;
        [key: string]: any;
    };

    // Child Carriers
    carriers: Carrier[];

    // Additional Properties
    newVentureFit?: string; // e.g. "Yes", "No"
    excludedCargo?: string[]; // List of commodities excluded

    // Legacy mapping (optional, for compatibility during migration if needed)
    auditQuestions: CarrierAuditQuestion[];

    // UI Helpers
    recommendationTag?: string; // e.g. "PREFERRED CHOICE"
    recommendationNotes?: string;
}

export interface Carrier {
    id: string;
    name: string;
    rating: string;
    type: string;
    isRRG?: boolean; // Added for explicit risk identification
}

export interface CarrierAuditQuestion {
    id: string;
    question: string;
    triggerAnswer: boolean | string | number;
    failureMessage: string;
    category?: 'knockout' | 'warning' | 'info';
}

export interface FilterCriteria {
    driverAge: number | null;
    vehicleYear: number | null;
    yearsInBusiness: number | null;
    cargoType: string | null;
    hasDashCam: boolean;
    state: string | null;
    vehicleType: string | null;
}

export interface StrategyRule {
    primary: string[];
    secondary: string[];
    notes: string;
}

export interface AgencyStrategy {
    [cargoType: string]: {
        [tenure: string]: StrategyRule;
    };
}

export interface RecommendationResult {
    recommended: MGA[];
    others: MGA[];
    ineligible: { market: MGA; reason: string }[];
}


// Progressive-specific knockout commodities
export const PROGRESSIVE_EXCLUDED_COMMODITIES = [
    'Steel Coils',
    'Automobiles',
    'Livestock',
    'Coal/Aggregates',
    'Household Goods (Moving)',
    'Hazmat Class 1 (Explosives)',
    'Hazmat Class 2 (Gases)',
    'Hazmat Class 6 (Toxic)'
] as const;

// Geico-specific knockout commodities
export const GEICO_EXCLUDED_COMMODITIES = [
    'Automobiles',
    'Steel Coils',
    'Hazmat Class 1 (Explosives)',
    'Hazmat Class 2 (Gases)',
    'Livestock'
] as const;
