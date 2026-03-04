'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import DataTable, { createTheme } from 'react-data-table-component';
import Link from 'next/link';
import { useState } from 'react';

interface Menu_ {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  menu_disponible: string;
}

const menu: Menu_[] = [
  {
    id: 1,
    nombre: 'ceviche',
    precio: 14,
    categoria: '',
    menu_disponible: ''
  }
];

const columnas = [
  {
    name: 'Nº',
    selector: (row: Menu_) => row.id,
    sortable: true
  },
  {
    name: 'Nombre',
    selector: (row: Menu_) => row.nombre,
    sortable: true
  },
  {
    name: 'Precio',
    selector: (row: Menu_) => row.precio,
    sortable: true
  },
  {
    name: 'Menú Disponible',
    selector: (row: Menu_) => row.menu_disponible,
    sortable: true
  },

  {
    name: 'Acciones',
    cell: (row: Menu_) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/operaciones-de-servicio/menu/modificar-menu/${row.id}`}
            >
              Ver Detalles
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];
const paginacionOpciones = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
};
export default function MenuPage() {
  const [filtro, setFiltro] = useState('');
  const datosFiltrados = menu.filter((u) =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Menú</CardTitle>
            <CardDescription>Listado de Menú</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/operaciones-de-servicio/menu/registrar-menu">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </Link>
          </div>
        </div>
        {/*<div className='grid grid-cols-12 gap-4 mt-2'>
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">
              Almacenes
            </label>
            <Input
              type="text"
              placeholder="Buscar almacenes..."
              className="w-full border border-gray-300 rounded-md p-2"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

        </div>*/}
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnas}
            data={datosFiltrados}
            progressPending={false}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay registros para mostrar"
          />
        </div>
      </CardContent>
    </Card>
  );
}
