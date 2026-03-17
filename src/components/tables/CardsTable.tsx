import VisualCreditCard from '@/components/cards/VisualCreditCard';

export default function CardsTable({
    rows,
    onDelete,
}: {
    columns: { header: string; accessorKey: string }[];
    rows: any[];
    onDelete?: (id: string, name: string) => void;
}) {
    if (!rows || rows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-muted/30">
                <p className="text-muted-foreground font-medium">Nenhum cartão encontrado.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rows.map((row) => (
                <VisualCreditCard
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    closingDay={Number(row.closingDay)}
                    dueDay={Number(row.dueDay)}
                    onDelete={onDelete || (() => {})}
                />
            ))}
        </div>
    );
}
