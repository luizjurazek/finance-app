'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';

export default function TransactionsForm() {
    const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
    const isExpense = type === 'EXPENSE';

    return (
        <div className="max-w-full mx-auto animate-in fade-in duration-500">
            {/* Minimalist Type Switcher */}
            <div className="flex gap-8 border-b border-border pb-px mb-10 overflow-x-auto scrollbar-none">
                <button
                    onClick={() => setType('EXPENSE')}
                    className={cn(
                        'pb-4 px-2 text-sm font-bold transition-all relative whitespace-nowrap',
                        isExpense ? 'text-destructive' : 'text-muted-foreground hover:text-foreground',
                    )}
                >
                    Nova Despesa
                    {isExpense && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-destructive animate-in slide-in-from-left-2 rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setType('INCOME')}
                    className={cn(
                        'pb-4 px-2 text-sm font-bold transition-all relative whitespace-nowrap',
                        !isExpense ? 'text-success' : 'text-muted-foreground hover:text-foreground',
                    )}
                >
                    Nova Receita
                    {!isExpense && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-success animate-in slide-in-from-right-2 rounded-t-full" />
                    )}
                </button>
            </div>

            <div className="transition-all duration-300">{isExpense ? <ExpenseForm /> : <IncomeForm />}</div>
        </div>
    );
}
