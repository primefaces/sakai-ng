export interface Quote {
  id?: string;
  agentId: string;
  agentEmail: string;
  status: QuoteStatus;

  // Client & Business Info
  client: {
    businessName: string;
    dotNumber: string;
    contactName: string;
    email: string;
    phone: string;
    mailingAddress: string;
    garagingAddress: string;
  };

  // Risk Profile Snapshot
  risk: {
    drivers: any[]; // Store snapshot of drivers
    vehicles: any[]; // Store snapshot of vehicles
    cargoCommodities: string[];
  };

  // Carrier Submissions (Markets)
  submissions: QuoteSubmission[];

  // Pricing & Terms
  pricing: {
    targetPremium?: number; // Client's desired price
    quotedPremium?: number; // Final quoted price
    downPayment?: number;
    monthlyPayment?: number;
    numberOfPayments?: number;
    notes?: string;
  };

  // Meta
  createdAt: any;
  submittedAt?: any;
  quotedAt?: any;
  boundAt?: any;
}

export interface QuoteSubmission {
  mgaId: string;
  mgaName: string;
  coverageType: string; // e.g., 'AL', 'MTC', 'PD' or 'Package'
  status: 'PENDING' | 'DECLINED' | 'QUOTED';
  premium?: number;
  notes?: string;
}

export type QuoteStatus = 'DRAFT' | 'SUBMITTED' | 'QUOTED' | 'BOUND' | 'DENIED';
