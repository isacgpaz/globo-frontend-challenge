import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Artist } from "@/types/artist";

export function ArtistsTable({ data }: { data: Artist[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((artist, index) => (
          <TableRow key={artist.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{artist.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}