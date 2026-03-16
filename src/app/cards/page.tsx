'use client';

import { useEffect, useState } from 'react';
import CardsForm from '@/components/forms/cards/CardsForm';
import { ProtectedRoute } from '@/components/protected-route';
import { cardsApi } from '@/api/cards/cards';
import HeroTable from '@/components/tables/HeroTable';

export default function CardsPage() {
    const [cards, setCards] = useState([]);
    const columns = [
        { header: 'Nome', accessorKey: 'name' },
        { header: 'Dia de fechamento', accessorKey: 'closingDay' },
        { header: 'Dia de vencimento', accessorKey: 'dueDay' },
    ];

    async function loadCards() {
        const cards = await cardsApi.getCards();
        setCards(cards);
    }

    useEffect(() => {
        loadCards();
    }, []);

    return (
        <ProtectedRoute>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Cartões de crédito</h1>
                <CardsForm onCreated={loadCards} />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Seus cartões</h2>
                <HeroTable columns={columns} rows={cards} />
            </div>
        </ProtectedRoute>
    );
}
