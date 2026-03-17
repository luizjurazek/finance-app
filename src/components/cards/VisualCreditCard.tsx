'use client';

import { CreditCard as CardIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogModal } from '@/components/ui/dialog';
import { useState } from 'react';
import type { VisualCreditCardProps } from './visualCreditCardType';
import getCardColors from './GetCardCalors';

export default function VisualCreditCard({ id, name, closingDay, dueDay, onDelete }: VisualCreditCardProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const backgroundGradient = getCardColors(id, name, closingDay, dueDay);

    return (
        <div className="group relative h-56 w-full max-w-[360px] perspective-1000 justify-self-center">
            <div className="relative h-full w-full">
                <div
                    className="absolute inset-0 rounded-2xl p-6 shadow-2xl transition-all duration-300 overflow-hidden"
                    style={{
                        background: backgroundGradient,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                    <div className="relative h-full flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                    <CardIcon size={24} />
                                </div>
                                <span className="font-bold tracking-tight text-lg opacity-90">FinanceApp</span>
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
                                        className="text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
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

                        <div className="mt-4">
                            <div className="w-12 h-9 bg-yellow-400/80 rounded-md mb-4 shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 flex flex-col justify-around">
                                    <div className="h-[1px] bg-black/10 w-full" />
                                    <div className="h-[1px] bg-black/10 w-full" />
                                    <div className="h-[1px] bg-black/10 w-full" />
                                </div>
                                <div className="absolute inset-0 flex justify-around">
                                    <div className="w-[1px] bg-black/10 h-full" />
                                    <div className="w-[1px] bg-black/10 h-full" />
                                    <div className="w-[1px] bg-black/10 h-full" />
                                </div>
                            </div>
                            <h3 className="text-xl font-medium tracking-wider truncate uppercase">
                                {name || 'NOME DO CARTÃO'}
                            </h3>
                        </div>

                        <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-80 mt-auto">
                            <div>
                                <p className="mb-1 text-[8px] font-bold">Fechamento</p>
                                <p className="text-sm font-semibold">Dia {closingDay}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-[8px] font-bold">Vencimento</p>
                                <p className="text-sm font-semibold">Dia {dueDay}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
