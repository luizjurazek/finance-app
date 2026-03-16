import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function HeroTable({
    columns,
    rows,
}: {
    columns: { header: string; accessorKey: string }[];
    rows: { [key: string]: string }[];
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.accessorKey}>{column.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        {columns.map((column) => (
                            <TableCell key={column.accessorKey}>{row[column.accessorKey]}</TableCell>
                        ))}
                        <TableCell>
                            <Button variant="outline" size="sm">
                                Editar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
