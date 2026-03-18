'use client';

import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

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
            <div className={cn('grid w-full gap-1.5', containerClassName)}>
                {label && <label className="input-label">{label}</label>}
                <Select {...props}>
                    <SelectTrigger
                        ref={ref}
                        className={cn(
                            'input-field !h-12 w-full rounded-xl border-border bg-background px-4 text-base text-foreground transition-all outline-none focus:border-ring focus:[box-shadow:0_0_0_2px_var(--background),0_0_0_4px_var(--ring)] flex items-center gap-2',
                            error &&
                                'border-destructive focus:border-destructive focus:[box-shadow:0_0_0_2px_var(--background),0_0_0_4px_var(--destructive)]',
                            triggerClassName,
                        )}
                    >
                        <div className="flex items-center gap-2 overflow-hidden flex-1 text-left">
                            {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
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
                    <p className="text-sm font-medium text-destructive">{error}</p>
                ) : helperText ? (
                    <p className="text-sm text-muted-foreground">{helperText}</p>
                ) : null}
            </div>
        );
    },
);

SelectField.displayName = 'SelectField';

export { SelectField };
