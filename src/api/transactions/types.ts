export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export enum PaymentMethod {
    DEBIT = 'DEBIT',
    CREDIT_CARD = 'CREDIT_CARD',
    PIX = 'PIX',
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK_TRANSFER',
}

export interface CreateTransaction {
    name: string;
    date: string;
    amount: number;
    category: string;
    type: TransactionType;
    isPaid: boolean;
    paymentMethod: PaymentMethod;
    totalInstallments?: number;
    creditCardId?: number;
}
