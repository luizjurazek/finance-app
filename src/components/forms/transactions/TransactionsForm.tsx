'use client';

import { useState } from 'react';
import clsx from 'clsx';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import styles from './TransactionsForm.module.css';

export default function TransactionsForm() {
    const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
    const isExpense = type === 'EXPENSE';

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <button
                    onClick={() => setType('EXPENSE')}
                    className={clsx(styles.tab, isExpense && styles.tabExpenseActive)}
                >
                    Nova Despesa
                    {isExpense && <div className={clsx(styles.tabIndicator, styles.tabIndicatorExpense)} />}
                </button>
                <button
                    onClick={() => setType('INCOME')}
                    className={clsx(styles.tab, !isExpense && styles.tabIncomeActive)}
                >
                    Nova Receita
                    {!isExpense && <div className={clsx(styles.tabIndicator, styles.tabIndicatorIncome)} />}
                </button>
            </div>

            <div className={styles.panel}>{isExpense ? <ExpenseForm /> : <IncomeForm />}</div>
        </div>
    );
}
