export interface Receipt {
    receiptNumber: number,
    customer: Customer,
    sum: number,
    paymentMethods: string,
    date: Date,
    description: string,
    details: string
}
export interface Customer {
    name: string,
    number: number
}
export interface Expense {
    date: Date,
    amount: number,
    provider: string,
    paymentMethods: string,
    details: string
}
export interface Revenue {
    date: Date,
    amount: number,
    provider: string,
    paymentMethods: string,
    details: string
}
