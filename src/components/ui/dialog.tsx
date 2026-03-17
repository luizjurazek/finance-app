'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * Shared Animation Classes
 */
const ANIMATION_CLASSES =
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0';

/**
 * Dialog Overlay Styles
 */
const overlayVariants = cva(`fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] ${ANIMATION_CLASSES}`);

/**
 * Dialog Content Styles
 */
const contentVariants = cva(
    `fixed left-[50%] top-[50%] z-50 grid w-[95vw] -translate-x-[50%] -translate-y-[50%] gap-4 rounded-xl border bg-background p-6 shadow-2xl duration-300 ${ANIMATION_CLASSES} data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95`,
    {
        variants: {
            size: {
                default: 'max-w-lg',
                sm: 'max-w-sm',
                lg: 'max-w-3xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
);

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
    <DialogPrimitive.Overlay ref={ref} className={cn(overlayVariants(), className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Dialog Content Component
 */
interface DialogContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof contentVariants> {}

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
    ({ className, children, size, ...props }, ref) => (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content ref={ref} className={cn(contentVariants({ size }), className)} {...props}>
                {children}
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar</span>
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
    <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * Dialog Footer Component
 */
const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 pt-4', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * Dialog Title Component
 */
const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn('text-xl font-bold leading-none tracking-tight', className)}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Dialog Description Component
 */
const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
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
    size?: VariantProps<typeof contentVariants>['size'];
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

                <div className="py-2">{children}</div>

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
