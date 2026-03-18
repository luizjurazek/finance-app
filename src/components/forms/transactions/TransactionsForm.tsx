'use client';
import { Input } from '@/components/ui/input';
import { SelectField } from '@/components/ui/select-field';
import { CurrencyInput } from '@/components/ui/currency-input';
import { useEffect, useState } from 'react';
import { cardsApi } from '@/api/cards/cards';
import { TRANSACTION_TYPES, PAYMENT_METHODS } from './types';
import {
    FileText,
    Tag,
    Calendar,
    DollarSign,
    ArrowUpCircle,
    ArrowDownCircle,
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

export default function TransactionsForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('EXPENSE');
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

        getCards();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !amount || !category || !type || !paymentMethod) {
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
                totalInstallments: paymentMethod === 'CREDIT_CARD' ? totalInstallments : undefined,
                creditCardId: paymentMethod === 'CREDIT_CARD' && creditCard ? Number(creditCard) : undefined,
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
        <div className="max-w-full mx-auto">
            <div>
                <div className="mb-6 border-b border-border pb-4">
                    <h2 className="text-2xl font-bold">Nova Transação</h2>
                    <p className="text-muted-foreground">Preencha os dados abaixo para registrar sua movimentação.</p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Identificação
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Nome"
                                icon={<FileText size={18} />}
                                placeholder="Ex: Aluguel, Supermercado..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                label="Categoria"
                                icon={<Tag size={18} />}
                                placeholder="Ex: Moradia, Alimentação..."
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Datas e Valores
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-1">
                                <CurrencyInput
                                    label="Valor"
                                    placeholder="0,00"
                                    value={amount}
                                    onValueChange={setAmount}
                                />
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

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Status
                        </h3>
                        <div
                            onClick={() => setIsPaid(!isPaid)}
                            className={cn(
                                'flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer select-none',
                                isPaid
                                    ? 'border-success/50 bg-success/5 shadow-md shadow-success/10'
                                    : 'border-border bg-card hover:border-border/80',
                            )}
                        >
                            <div
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                                    isPaid ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground',
                                )}
                            >
                                {isPaid ? <CheckCircle size={24} /> : <XCircle size={24} />}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-lg leading-tight">
                                    {type === 'INCOME' ? 'Recebido' : 'Pago'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {isPaid
                                        ? type === 'INCOME'
                                            ? 'Valor já disponível em conta'
                                            : 'Valor já debitado do saldo'
                                        : 'Transação pendente de efetivação'}
                                </p>
                            </div>
                            <div
                                className={cn(
                                    'w-12 h-6 rounded-full p-1 transition-all',
                                    isPaid ? 'bg-success' : 'bg-muted',
                                )}
                            >
                                <div
                                    className={cn(
                                        'w-4 h-4 rounded-full bg-white transition-all shadow-sm',
                                        isPaid ? 'translate-x-6' : 'translate-x-0',
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Pagamento
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectField
                                label="Tipo"
                                icon={
                                    type === 'INCOME' ? (
                                        <ArrowUpCircle size={18} className="text-success" />
                                    ) : type === 'EXPENSE' ? (
                                        <ArrowDownCircle size={18} className="text-destructive" />
                                    ) : (
                                        <ArrowUpCircle size={18} className="text-muted-foreground" />
                                    )
                                }
                                placeholder="Selecione o Tipo"
                                options={TRANSACTION_TYPES}
                                value={type}
                                onValueChange={setType}
                            />

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

                        {paymentMethod === 'CREDIT_CARD' && (
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
                            className="btn btn-primary h-12 w-full md:w-auto px-10 flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                            {loading ? 'Salvando...' : 'Salvar Transação'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
