import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';

export function Categoria({ cate }: { cate: any }) {

  return (
    <TableRow>
      <TableCell className="font-medium">{cate.nombres}</TableCell>
      <TableCell className="font-medium">{cate.descripcion} </TableCell>
      <TableCell className="hidden md:table-cell">{cate.nivel}</TableCell>
      <TableCell className="hidden md:table-cell"> {cate.orden}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Accion</DropdownMenuLabel>
            <Link href={`/Catalogo/categoria/modificar-categoria/${cate.id}`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
            {/*<DropdownMenuItem>
              <form>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
