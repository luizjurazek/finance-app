import api from '@/lib/api';
import { CreateTransaction } from './types';

export const transactionsApi = {
    async createTransaction(transaction: CreateTransaction) {
        const response = await api.post('/transactions', transaction);
        return response;
    },
    async findAll() {
        const response = await api.get('/transactions');
        return response;
    },
};
