// Enhanced Risk Profile Model for Underwriting Workbench

export interface RiskProfile {
    id?: string;
    userId?: string;
    createdAt?: any;
    updatedAt?: any;
    status: 'draft' | 'validated' | 'submitted';

    // Business Entity Information
    businessInfo: BusinessInfo;

    // Drivers
    drivers: Driver[];

    // Vehicles
    vehicles: Vehicle[];

    // Operations & Cargo
    operations: Operations;

    // Coverage Requirements
    coverage: Coverage;

    // Validation Results (populated after step 6)
    validationResults?: ValidationResult[];

    // Additional Risk Questions
    hasPriorInsurance?: boolean;
    priorInsuranceYears?: number;
    willingToInstallDashCam?: boolean;
    hasEld?: boolean;

    // Loss History
    lossHistory: LossRecord[];
}

export interface LossRecord {
    id: string;
    date: Date | string;
    type: 'AL' | 'PD' | 'Cargo' | 'GL';
    status: 'Open' | 'Closed';
    amount: number;
    description?: string;
    insuranceCarrier?: string;
}

export interface BusinessInfo {
    entityType: 'LLC' | 'Corp' | 'Individual' | 'Partnership';
    businessName: string;
    dbaName?: string;
    ownerName?: string; // New
    ownerEmail?: string; // New
    yearsInBusiness: number;
    operatingRadius: number; // miles
    garagingAddress: Address;
    mailingAddress?: Address;
    federalId?: string;
    dotNumber?: string;
    mcNumber?: string;
}

export interface Address {
    street?: string;
    city: string;
    state: string;
    zip: string;
}

export interface Driver {
    id?: string;
    name: string;
    dob?: Date | string | null;
    licenseNumber?: string;
    licenseDate?: Date | string;
    licenseState?: string;
    licenseType?: string; // CDL A, B, etc.
    yearsExperience?: number;
    violations: Violation[];
    accidents: Accident[];
    // Computed fields
    violationsCount?: number;
    accidentsCount?: number;
    age?: number;
}

export interface Violation {
    id?: string;
    date: Date | string;
    type: string;
    description: string;
    points?: number;
}

export interface Accident {
    id?: string;
    date: Date | string;
    atFault: boolean;
    injuries: boolean;
    damageCost?: number;
    description?: string;
}

export interface Vehicle {
    id: string;
    year: number;
    make: string;
    model: string;
    vin: string;
    gvwr: number; // Gross Vehicle Weight Rating in pounds
    value: number;
    usage: 'Primary' | 'Backup' | 'Seasonal';
    plateNumber?: string;
    statedAmount?: number; // For physical damage
    type?: string; // Tractor, Trailer, etc.
}

export interface Operations {
    cargoCommodities: string[]; // e.g., ['General Freight', 'Steel Coils', 'Hazmat']
    filingsRequired: string[]; // e.g., ['USDOT', 'MC', 'UIIA']
    operatingStates?: string[];
    operatingRegion?: 'Local' | 'Regional' | 'Long Haul' | 'Interstate';
    percentageRadiusBreakdown?: {
        local: number; // 0-50 miles
        regional: number; // 51-200 miles
        longHaul: number; // 201+ miles
    };
}

export interface Coverage {
    liabilityLimit: number; // Auto Liability
    cargoLimit?: number;
    cargoDeductible?: number; // Added
    trailerInterchange?: number;
    physicalDamage?: boolean;
    physicalDamageDeductibles?: { comp: number; coll: number; }; // Added
    generalLiability?: number;
    uninsuredMotorist?: number;
    selectedSubCoverages?: { [key: string]: string[] }; // Map of Coverage ID -> List of SubCoverage IDs
}

export interface CommodityPercentage {
    id?: string;
    name: string;
    percentage: number;
    color: string;
}

// Validation Result after carrier rule checking
export interface ValidationResult {
    carrierId: string;
    carrierName: string;
    status: 'eligible' | 'knockout' | 'warning';
    score: number; // 0-100 matching confidence
    passedChecks: string[];
    failedChecks: FailedCheck[];
    submittable: boolean;
    marketData?: any; // Full MarketRule object for display details
}

export interface FailedCheck {
    questionId: string;
    question: string;
    reason: string;
    category: 'knockout' | 'warning' | 'info';
}

// Commodity options for multi-select
export const CARGO_COMMODITIES = [
    'General Freight',
    'Dry Van',
    'Refrigerated',
    'Flatbed',
    'Steel Coils',
    'Building Materials',
    'Machinery',
    'Electronics',
    'Food Products',
    'Beverages',
    'Household Goods',
    'Paper Products',
    'Chemicals',
    'Hazmat Class 3 (Flammable Liquids)',
    'Hazmat Class 8 (Corrosives)',
    'Automobiles',
    'Livestock',
    'Coal/Aggregates'
] as const;

// Filing requirements
export const FILING_TYPES = [
    'USDOT',
    'MC (Motor Carrier)',
    'FF (Freight Forwarder)',
    'UIIA (Intermodal)',
    'MX (Mexico)',
    'BMC-91/91X'
] as const;

// Common violation types
export const VIOLATION_TYPES = [
    'Speeding (1-10 mph over)',
    'Speeding (11-20 mph over)',
    'Speeding (21+ mph over)',
    'Following Too Close',
    'Improper Lane Change',
    'Failure to Obey Traffic Control',
    'Reckless Driving',
    'DUI/DWI',
    'Driving While Suspended',
    'Log Book Violation',
    'Overweight',
    'Hours of Service Violation',
    'Other Moving Violation'
] as const;
