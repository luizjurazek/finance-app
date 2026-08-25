'use client';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cardsApi } from '@/api/cards/cards';
import styles from './CardsForm.module.css';

export default function CardsForm({ onCreated }: { onCreated: () => void }) {
    const [cardName, setCardName] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async () => {
        try {
            await cardsApi.createCard({
                name: cardName,
                closingDay: Number(closingDate),
                dueDay: Number(dueDate),
            });

            setCardName('');
            setClosingDate('');
            setDueDate('');

            onCreated();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>Nova Transação</h2>
                <p className={styles.subtitle}>Preencha os dados abaixo para registrar sua movimentação.</p>
            </div>
            <div className={styles.row}>
                <div className={styles.field}>
                    <Input
                        id="card-name"
                        name="card-name"
                        type="text"
                        autoComplete="off"
                        required
                        placeholder="Nome do cartão"
                        onChange={(e) => setCardName(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <Input
                        id="closing-date"
                        name="closing-date"
                        type="number"
                        autoComplete="off"
                        required
                        placeholder="Dia de fechamento"
                        onChange={(e) => setClosingDate(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <Input
                        id="due-date"
                        name="due-date"
                        type="number"
                        autoComplete="off"
                        required
                        placeholder="Dia de vencimento"
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Criar cartão
                    </button>
                </div>
            </div>
        </div>
    );
}
