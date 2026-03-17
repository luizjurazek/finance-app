interface VisualCreditCardProps {
    id: string;
    name: string;
    closingDay: number;
    dueDay: number;
    onDelete: (id: string, name: string) => void;
}

export type { VisualCreditCardProps };
