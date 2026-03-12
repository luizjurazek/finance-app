import api from '@/lib/api';

export const cardsApi = {
    async createCard(card: { name: string; closingDay: number; dueDay: number }) {
        const response = await api.post('/credit-cards', card);
        return response.data;
    },
    async getCards() {
        const response = await api.get('/credit-cards');
        return response.data;
    },
    async getCardById(id: number) {
        const response = await api.get(`/credit-cards/${id}`);
        return response.data;
    },
    async updateCard(id: number, card: { cardName: string; closingDate: number; dueDate: number }) {
        const response = await api.patch(`/credit-cards/${id}`, card);
        return response.data;
    },
    async deleteCard(id: number) {
        const response = await api.delete(`/credit-cards/${id}`);
        return response.data;
    },
};
