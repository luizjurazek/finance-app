'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
        return (
            <div className={cn('grid w-full gap-1.5', containerClassName)}>
                {label && <label className="input-label">{label}</label>}
                <div
                    className={cn(
                        'input-field flex items-center gap-2 transition-all focus-within:border-ring focus-within:[box-shadow:0_0_0_2px_var(--background),0_0_0_4px_var(--ring)]',
                        error &&
                            'border-destructive focus-within:border-destructive focus-within:[box-shadow:0_0_0_2px_var(--background),0_0_0_4px_var(--destructive)]',
                        className,
                    )}
                >
                    {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
                    <span className="text-muted-foreground font-medium select-none pointer-events-none">{symbol}</span>
                    <input
                        {...props}
                        ref={ref}
                        type="number"
                        step="0.01"
                        className="flex-1 bg-transparent border-none outline-none text-base h-full w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={value || ''}
                        onChange={(e) => onValueChange(Number(e.target.value))}
                    />
                </div>
                {error ? (
                    <p className="text-sm font-medium text-destructive">{error}</p>
                ) : helperText ? (
                    <p className="text-sm text-muted-foreground">{helperText}</p>
                ) : null}
            </div>
        );
    },
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
