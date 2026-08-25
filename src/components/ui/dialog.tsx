'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import clsx from 'clsx';
import styles from './dialog.module.css';
import { Button } from '@/components/ui/button';

type DialogSize = 'default' | 'sm' | 'lg';

const sizeClass: Record<DialogSize, string> = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
};

/**
 * Base Components
 */
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/**
 * Dialog Overlay Component
 */
const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay ref={ref} className={clsx(styles.overlay, className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Dialog Content Component
 */
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    size?: DialogSize;
}

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
    ({ className, children, size = 'default', ...props }, ref) => (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={clsx(styles.content, sizeClass[size], className)}
                {...props}
            >
                {children}
                <DialogPrimitive.Close className={styles.close}>
                    <X size={16} />
                    <span className={styles.srOnly}>Fechar</span>
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPortal>
    ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Dialog Header Component
 */
const DialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={clsx(styles.header, className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * Dialog Footer Component
 */
const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={clsx(styles.footer, className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * Dialog Title Component
 */
const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={clsx(styles.title, className)} {...props} />);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Dialog Description Component
 */
const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description ref={ref} className={clsx(styles.description, className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Dialog Modal Helper Types
 */
type DialogVariant = 'default' | 'danger' | 'success' | 'warning';

interface DialogModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    size?: DialogSize;
    variant?: DialogVariant;
    trigger: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * DialogModal Helper Component
 * A pre-composed dialog with header, body, and footer actions.
 */
function DialogModal({
    open,
    onOpenChange,
    title,
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    size = 'default',
    variant = 'default',
    trigger,
    children,
}: DialogModalProps) {
    const isDestructive = variant === 'danger';
    const confirmVariant = isDestructive ? 'destructive' : variant === 'success' ? 'secondary' : 'default';

    const handleConfirm = () => {
        onConfirm?.();
        onOpenChange(false);
    };

    const handleCancel = () => {
        onCancel?.();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent size={size}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className={styles.body}>{children}</div>

                <DialogFooter>
                    <Button variant="ghost" onClick={handleCancel}>
                        {cancelText}
                    </Button>
                    <Button variant={confirmVariant} onClick={handleConfirm}>
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export { DialogModal };
