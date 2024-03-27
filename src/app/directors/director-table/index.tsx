import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Director } from "@/types/director";

export function DirectorsTable({ data }: { data: Director[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((director, index) => (
          <TableRow key={director.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{director.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}