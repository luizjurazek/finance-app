import VisualCreditCard from '@/components/cards/VisualCreditCard';
import styles from './CardsTable.module.css';

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
            <div className={styles.empty}>
                <p className={styles.emptyText}>Nenhum cartão encontrado.</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
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
