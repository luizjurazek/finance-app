'use client';

import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import clsx from 'clsx';
import styles from './alert-dialog.module.css';
import { Button } from '@/components/ui/button';

function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
    return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
    return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
    return (
        <AlertDialogPrimitive.Overlay
            data-slot="alert-dialog-overlay"
            className={clsx(styles.overlay, className)}
            {...props}
        />
    );
}

function AlertDialogContent({
    className,
    size = 'default',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
    size?: 'default' | 'sm';
}) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                data-size={size}
                className={clsx(styles.content, className)}
                {...props}
            />
        </AlertDialogPortal>
    );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="alert-dialog-header" className={clsx(styles.header, className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="alert-dialog-footer" className={clsx(styles.footer, className)} {...props} />;
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<'div'>) {
    return <div data-slot="alert-dialog-media" className={clsx(styles.media, className)} {...props} />;
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
        <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={clsx(styles.title, className)} {...props} />
    );
}

function AlertDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={clsx(styles.description, className)}
            {...props}
        />
    );
}

function AlertDialogAction({
    className,
    variant = 'default',
    size = 'default',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
    Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'>) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={className} {...props} />
        </Button>
    );
}

function AlertDialogCancel({
    className,
    variant = 'outline',
    size = 'default',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
    Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'>) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={className} {...props} />
        </Button>
    );
}

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
};
