'use client';

import { Input } from '@/components/ui/input';
import { SelectField } from '@/components/ui/select-field';
import { CurrencyInput } from '@/components/ui/currency-input';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { cardsApi } from '@/api/cards/cards';
import { PAYMENT_METHODS, INCOME_PAYMENT_METHODS } from './types';
import {
    FileText,
    Tag,
    Calendar,
    CreditCard,
    Wallet,
    CalendarDays,
    Plus,
    CheckCircle,
    XCircle,
    Loader2,
} from 'lucide-react';
import { transactionsApi } from '@/api/transactions/transactions';
import { useRouter } from 'next/navigation';
import styles from './BaseTransactionForm.module.css';

interface BaseTransactionFormProps {
    type: 'EXPENSE' | 'INCOME';
}

const statusClass = {
    unpaid: styles.statusPillUnpaid,
    paidExpense: styles.statusPillPaidExpense,
    paidIncome: styles.statusPillPaidIncome,
};

const statusIconClass = {
    unpaid: styles.statusIconUnpaid,
    paidExpense: styles.statusIconPaidExpense,
    paidIncome: styles.statusIconPaidIncome,
};

export default function BaseTransactionForm({ type }: BaseTransactionFormProps) {
    const router = useRouter();
    const isExpense = type === 'EXPENSE';

    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [totalInstallments, setTotalInstallments] = useState(0);
    const [creditCard, setCreditCard] = useState('');

    const [loading, setLoading] = useState(false);
    const [creditCards, setCreditCards] = useState<{ value: string; label: string }[]>([]);

    const statusKey = !isPaid ? 'unpaid' : isExpense ? 'paidExpense' : 'paidIncome';

    useEffect(() => {
        async function getCards() {
            try {
                const response = await cardsApi.getCards();
                if (Array.isArray(response)) {
                    const formattedCards = response.map((card: any) => ({
                        value: String(card.id),
                        label: card.name,
                    }));
                    setCreditCards(formattedCards);
                }
            } catch (error) {
                console.error('Failed to fetch cards:', error);
            }
        }

        if (isExpense) {
            getCards();
        }
    }, [isExpense]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !amount || !category || !paymentMethod) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            await transactionsApi.createTransaction({
                name,
                date: new Date(date).toISOString(),
                amount,
                category,
                type: type as any,
                isPaid,
                paymentMethod: paymentMethod as any,
                totalInstallments: isExpense && paymentMethod === 'CREDIT_CARD' ? totalInstallments : undefined,
                creditCardId:
                    isExpense && paymentMethod === 'CREDIT_CARD' && creditCard ? Number(creditCard) : undefined,
            });
            router.push('/transactions');
            router.refresh();
        } catch (error) {
            console.error('Failed to save transaction:', error);
            alert('Ops! Algo deu errado ao salvar a transação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.section}>
                <h3
                    className={clsx(
                        styles.sectionLabel,
                        isExpense ? styles.sectionLabelExpense : styles.sectionLabelIncome,
                    )}
                >
                    <span className={clsx(styles.sectionDot, isExpense ? styles.sectionDotExpense : styles.sectionDotIncome)} />
                    Identificação
                </h3>
                <div className={styles.fieldRow}>
                    <Input
                        label={isExpense ? 'Nome da Despesa' : 'Origem / Nome'}
                        icon={<FileText size={18} />}
                        placeholder={isExpense ? 'Ex: Aluguel, Supermercado...' : 'Ex: Salário, Venda, Pix...'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Categoria"
                        icon={<Tag size={18} />}
                        placeholder={isExpense ? 'Ex: Moradia, Alimentação...' : 'Ex: Trabalho, Renda Extra...'}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h3
                    className={clsx(
                        styles.sectionLabel,
                        isExpense ? styles.sectionLabelExpense : styles.sectionLabelIncome,
                    )}
                >
                    <span className={clsx(styles.sectionDot, isExpense ? styles.sectionDotExpense : styles.sectionDotIncome)} />
                    Datas e Valores
                </h3>
                <div className={styles.fieldRow}>
                    <CurrencyInput label="Valor" placeholder="0,00" value={amount} onValueChange={setAmount} />
                    <Input
                        label="Data da transação"
                        type="date"
                        icon={<CalendarDays size={18} />}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h3
                    className={clsx(
                        styles.sectionLabel,
                        isExpense ? styles.sectionLabelExpense : styles.sectionLabelIncome,
                    )}
                >
                    <span className={clsx(styles.sectionDot, isExpense ? styles.sectionDotExpense : styles.sectionDotIncome)} />
                    Status
                </h3>
                <div
                    onClick={() => setIsPaid(!isPaid)}
                    className={clsx(styles.statusPill, statusClass[statusKey])}
                >
                    <div className={clsx(styles.statusIcon, statusIconClass[statusKey])}>
                        {isPaid ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    </div>
                    <div className={styles.statusTextGroup}>
                        <span className={clsx(styles.statusLabel, isPaid && styles.statusLabelActive)}>
                            {isPaid ? (isExpense ? 'Pago' : 'Recebido') : 'Pendente'}
                        </span>
                        <span className={styles.statusCaption}>Status</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3
                    className={clsx(
                        styles.sectionLabel,
                        isExpense ? styles.sectionLabelExpense : styles.sectionLabelIncome,
                    )}
                >
                    <span className={clsx(styles.sectionDot, isExpense ? styles.sectionDotExpense : styles.sectionDotIncome)} />
                    {isExpense ? 'Pagamento' : 'Recebimento'}
                </h3>
                <div className={styles.fieldRow}>
                    <SelectField
                        label={isExpense ? 'Método de Pagamento' : 'Método de Recebimento'}
                        icon={<Wallet size={18} />}
                        placeholder="Selecione o Método"
                        options={isExpense ? PAYMENT_METHODS : INCOME_PAYMENT_METHODS}
                        value={paymentMethod}
                        onValueChange={(value) => {
                            setPaymentMethod(value);
                            if (value !== 'CREDIT_CARD') {
                                setTotalInstallments(0);
                                setCreditCard('');
                            }
                        }}
                    />
                </div>

                {isExpense && paymentMethod === 'CREDIT_CARD' && (
                    <div className={clsx(styles.fieldRow, styles.installmentRow)}>
                        <Input
                            label="Total de Parcelas"
                            type="number"
                            icon={<Calendar size={18} />}
                            placeholder="Ex: 12"
                            value={totalInstallments}
                            onChange={(e) => setTotalInstallments(Number(e.target.value))}
                        />
                        <SelectField
                            label="Cartão de Crédito"
                            icon={<CreditCard size={18} />}
                            placeholder="Selecione o cartão"
                            options={creditCards}
                            value={creditCard}
                            onValueChange={setCreditCard}
                        />
                    </div>
                )}
            </div>

            <div className={styles.submitRow}>
                <button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                        'btn',
                        styles.submitButton,
                        isExpense ? styles.submitButtonExpense : styles.submitButtonIncome,
                    )}
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                    {loading ? 'Salvando...' : isExpense ? 'Salvar Despesa' : 'Salvar Receita'}
                </button>
            </div>
        </form>
    );
}
