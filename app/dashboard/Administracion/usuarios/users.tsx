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

export function Users({ user }: { user: any }) {

  return (
    <TableRow>
      <TableCell className="font-medium">{user.nombres}</TableCell>
      <TableCell className="font-medium">{user.email}      </TableCell>
      <TableCell className="hidden md:table-cell">{user.rol}</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize  font-medium">
          {user.vigencia}
        </Badge>


      </TableCell>

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
            <Link href={`/dashboard/Administracion/usuarios/modificar-usuarios/${user.id}`}>
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
