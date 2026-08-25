import * as React from 'react';
import { Slot } from 'radix-ui';
import clsx from 'clsx';
import styles from './button.module.css';

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

const variantClass: Record<ButtonVariant, string> = {
    default: styles.variantDefault,
    outline: styles.variantOutline,
    secondary: styles.variantSecondary,
    ghost: styles.variantGhost,
    destructive: styles.variantDestructive,
    link: styles.variantLink,
};

const sizeClass: Record<ButtonSize, string> = {
    default: styles.sizeDefault,
    xs: styles.sizeXs,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
    icon: styles.sizeIcon,
    'icon-xs': styles.sizeIconXs,
    'icon-sm': styles.sizeIconSm,
    'icon-lg': styles.sizeIconLg,
};

interface ButtonProps extends React.ComponentProps<'button'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}

function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot.Root : 'button';

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={clsx(styles.root, variantClass[variant], sizeClass[size], className)}
            {...props}
        />
    );
}

export { Button };
