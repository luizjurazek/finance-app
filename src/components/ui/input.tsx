import * as React from 'react';
import clsx from 'clsx';
import styles from './input.module.css';

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
            <div className={clsx('field-group', containerClassName)}>
                {label && <label className="input-label">{label}</label>}
                <div
                    className={clsx('input-field', styles.wrapper, error && styles.wrapperError, className)}
                >
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <input {...props} type={type} ref={ref} className={styles.field} />
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
Input.displayName = 'Input';

export { Input };
