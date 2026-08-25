import * as React from 'react';
import clsx from 'clsx';
import styles from './alert.module.css';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant = 'default', ...props }, ref) => {
    const variantClass = variant === 'default' ? '' : `alert-${variant}`;

    return <div ref={ref} role="alert" className={clsx('alert', variantClass, className)} {...props} />;
});
Alert.displayName = 'Alert';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={clsx(styles.description, className)} {...props} />,
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription };
