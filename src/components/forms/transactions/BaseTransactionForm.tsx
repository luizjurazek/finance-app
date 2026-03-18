'use client';

import { Input } from '@/components/ui/input';
import { SelectField } from '@/components/ui/select-field';
import { CurrencyInput } from '@/components/ui/currency-input';
import { useEffect, useState } from 'react';
import { cardsApi } from '@/api/cards/cards';
import { PAYMENT_METHODS } from './types';
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
import { cn } from '@/lib/utils';

interface BaseTransactionFormProps {
    type: 'EXPENSE' | 'INCOME';
}

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
        <form className="space-y-8 animate-in fade-in duration-500" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <h3
                    className={cn(
                        'text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors',
                        isExpense ? 'text-destructive' : 'text-success',
                    )}
                >
                    <span
                        className={cn(
                            'w-1.5 h-5 rounded-full transition-colors',
                            isExpense ? 'bg-destructive' : 'bg-success',
                        )}
                    />
                    Identificação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="space-y-4">
                <h3
                    className={cn(
                        'text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors',
                        isExpense ? 'text-destructive' : 'text-success',
                    )}
                >
                    <span
                        className={cn(
                            'w-1.5 h-5 rounded-full transition-colors',
                            isExpense ? 'bg-destructive' : 'bg-success',
                        )}
                    />
                    Datas e Valores
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <CurrencyInput label="Valor" placeholder="0,00" value={amount} onValueChange={setAmount} />
                    </div>
                    <Input
                        label="Data da transação"
                        type="date"
                        icon={<CalendarDays size={18} />}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3
                    className={cn(
                        'text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors',
                        isExpense ? 'text-destructive' : 'text-success',
                    )}
                >
                    <span
                        className={cn(
                            'w-1.5 h-5 rounded-full transition-colors',
                            isExpense ? 'bg-destructive' : 'bg-success',
                        )}
                    />
                    Status
                </h3>
                <div
                    onClick={() => setIsPaid(!isPaid)}
                    className={cn(
                        'group flex items-center gap-3 p-2.5 px-4 rounded-xl border transition-all cursor-pointer select-none w-fit min-w-[180px]',
                        isPaid
                            ? isExpense
                                ? 'border-destructive/30 bg-destructive/5 text-destructive'
                                : 'border-success/30 bg-success/5 text-success'
                            : 'border-border bg-muted/10 text-muted-foreground hover:border-border/80',
                    )}
                >
                    <div
                        className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0',
                            isPaid
                                ? isExpense
                                    ? 'bg-destructive text-white shadow-sm shadow-destructive/20'
                                    : 'bg-success text-white shadow-sm shadow-success/20'
                                : 'bg-muted text-muted-foreground group-hover:bg-muted/50',
                        )}
                    >
                        {isPaid ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    </div>
                    <div className="flex flex-col">
                        <span className={cn('font-bold text-sm tracking-tight', isPaid ? 'opacity-100' : 'opacity-70')}>
                            {isPaid ? (isExpense ? 'Pago' : 'Recebido') : 'Pendente'}
                        </span>
                        <span className="text-[10px] uppercase font-bold opacity-50 tracking-widest leading-none">
                            Status
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3
                    className={cn(
                        'text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors',
                        isExpense ? 'text-destructive' : 'text-success',
                    )}
                >
                    <span
                        className={cn(
                            'w-1.5 h-5 rounded-full transition-colors',
                            isExpense ? 'bg-destructive' : 'bg-success',
                        )}
                    />
                    Pagamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                        label="Método de Pagamento"
                        icon={<Wallet size={18} />}
                        placeholder="Selecione o Método"
                        options={PAYMENT_METHODS}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
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

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        'btn h-12 w-full md:w-auto px-10 flex items-center justify-center gap-2 text-lg shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
                        isExpense
                            ? 'bg-destructive text-destructive-foreground shadow-destructive/20 hover:shadow-destructive/40'
                            : 'bg-success text-success-foreground shadow-success/20 hover:shadow-success/40',
                    )}
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                    {loading ? 'Salvando...' : isExpense ? 'Salvar Despesa' : 'Salvar Receita'}
                </button>
            </div>
        </form>
    );
}
