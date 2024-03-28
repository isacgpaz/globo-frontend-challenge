import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Media } from "@/types/media";

export function MediasTable({ data }: { data: Media[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Ano de lançamento</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((media, index) => (
          <TableRow key={media.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{media.title}</TableCell>
            <TableCell>{2024}</TableCell>
            <TableCell>
              Opções
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}