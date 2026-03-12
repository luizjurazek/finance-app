import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';

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
                {columns.map((column) => (
                    <TableColumn key={column.accessorKey}>{column.header}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        {columns.map((column) => (
                            <TableCell key={column.accessorKey}>{row[column.accessorKey]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
