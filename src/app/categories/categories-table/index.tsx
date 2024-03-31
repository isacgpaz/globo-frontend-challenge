import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/category";

export function CategoriesTable({ data }: { data: Category[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((category, index) => (
          <TableRow key={category.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{category.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}