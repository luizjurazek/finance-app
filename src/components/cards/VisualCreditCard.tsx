'use client';

import { CreditCard as CardIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogModal } from '@/components/ui/dialog';
import { useState } from 'react';
import type { VisualCreditCardProps } from './visualCreditCardType';
import getCardColors from './GetCardCalors';
import styles from './VisualCreditCard.module.css';

export default function VisualCreditCard({ id, name, closingDay, dueDay, onDelete }: VisualCreditCardProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const backgroundGradient = getCardColors(id, name, closingDay, dueDay);

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div
                    className={styles.face}
                    style={{
                        background: backgroundGradient,
                    }}
                >
                    <div className={styles.sheen} />
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.identity}>
                                <div className={styles.iconBox}>
                                    <CardIcon size={24} />
                                </div>
                                <span className={styles.name}>{name}</span>
                            </div>

                            <DialogModal
                                open={isDeleteDialogOpen}
                                onOpenChange={setIsDeleteDialogOpen}
                                title="Remover cartão"
                                description={`Deseja realmente remover o cartão "${name}"? Isso não pode ser desfeito.`}
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={styles.deleteButton}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Trash2 size={24} />
                                    </Button>
                                }
                                onCancel={() => setIsDeleteDialogOpen(false)}
                                onConfirm={() => {
                                    onDelete(id, name);
                                    setIsDeleteDialogOpen(false);
                                }}
                                variant="danger"
                                confirmText="Remover"
                                cancelText="Manter"
                                size="lg"
                            />
                        </div>

                        <div className={styles.chipWrapper}>
                            <div className={styles.chip}>
                                <div className={styles.chipLines}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div className={styles.chipColumns}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <div>
                                <p className={styles.footerLabel}>Fechamento</p>
                                <p className={styles.footerValue}>Dia {closingDay}</p>
                            </div>
                            <div>
                                <p className={styles.footerLabel}>Vencimento</p>
                                <p className={styles.footerValue}>Dia {dueDay}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
