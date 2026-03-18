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
    purchaseDate?: string;
    amount: number;
    category: string;
    type: TransactionType;
    paymentMethod: PaymentMethod;
    totalInstallments?: number;
    creditCardId?: number;
}
