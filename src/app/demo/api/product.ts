interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}

export interface Appointment {
    _id?: string;
    title?: string;
    appointmentType?: string;
    appointmentWith?: string;
    btName?: string;
    btCRID?: string;
    timezone?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    supervisorName?: string;
    supervisorCRID?: string;
    supervisorEmail?: string;
    recordedToBot?: boolean;
}
