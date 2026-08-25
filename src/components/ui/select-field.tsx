'use client';

import * as React from 'react';
import clsx from 'clsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './select-field.module.css';

export interface SelectFieldOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectFieldProps extends React.ComponentPropsWithoutRef<typeof Select> {
    options: SelectFieldOption[];
    placeholder?: string;
    label?: string;
    icon?: React.ReactNode;
    helperText?: string;
    error?: string;
    containerClassName?: string;
    triggerClassName?: string;
}

const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
    ({ options, placeholder, label, icon, helperText, error, containerClassName, triggerClassName, ...props }, ref) => {
        return (
            <div className={clsx('field-group', containerClassName)}>
                {label && <label className="input-label">{label}</label>}
                <Select {...props}>
                    <SelectTrigger
                        ref={ref}
                        className={clsx(
                            'input-field',
                            styles.trigger,
                            error && styles.triggerError,
                            triggerClassName,
                        )}
                    >
                        <div className={styles.valueRow}>
                            {icon && <div className={styles.icon}>{icon}</div>}
                            <SelectValue placeholder={placeholder} />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {error ? (
                    <p className="field-error">{error}</p>
                ) : helperText ? (
                    <p className="field-helper">{helperText}</p>
                ) : null}
            </div>
        );
    },
);

SelectField.displayName = 'SelectField';

export { SelectField };
