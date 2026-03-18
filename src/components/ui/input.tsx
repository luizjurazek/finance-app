import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    helperText?: string;
    containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, icon, error, helperText, containerClassName, ...props }, ref) => {
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
                    <input
                        {...props}
                        type={type}
                        ref={ref}
                        className="flex-1 bg-transparent border-none outline-none text-base h-full w-full placeholder:text-muted-foreground disabled:cursor-not-allowed"
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
Input.displayName = 'Input';

export { Input };
