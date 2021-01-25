export interface Work {
    id: string;
    work: string;
    workPrice: number;
    orderId: string;
    totalOrderPrice: number
}

export interface Order {
    id: string;
    clientName: string;
    phoneNumber: number;
    kindofgood: string;
    brandName: string;
    modelOfGood: string;
    malfunction: string;
    appearance: string;
    notes: string;
    estimatedPrice: number;
    prepayment: number;
    managerName: string;
    statusName: string;
    totalOrderPrice: number;
    date: Date;
    orderLabel: string
}
