'use client';

import * as React from 'react';
import clsx from 'clsx';
import styles from './input.module.css';

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: number;
    onValueChange: (value: number) => void;
    label?: string;
    error?: string;
    helperText?: string;
    symbol?: string;
    icon?: React.ReactNode;
    containerClassName?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    (
        {
            value,
            onValueChange,
            label,
            error,
            helperText,
            symbol = 'R$',
            icon,
            containerClassName,
            className,
            ...props
        },
        ref,
    ) => {
        const formatValue = (val: number) => {
            return new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, '');
            const numberValue = Number(rawValue) / 100;
            onValueChange(numberValue);
        };

        return (
            <div className={clsx('field-group', containerClassName)}>
                {label && <label className="input-label">{label}</label>}
                <div
                    className={clsx('input-field', styles.wrapper, error && styles.wrapperError, className)}
                >
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <span className={styles.symbol}>{symbol}</span>
                    <input
                        {...props}
                        ref={ref}
                        type="text"
                        inputMode="numeric"
                        className={styles.field}
                        value={formatValue(value)}
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <p className="field-error">{error}</p>
                ) : helperText ? (
                    <p className="field-helper">{helperText}</p>
                ) : null}
            </div>
        );
    },
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
