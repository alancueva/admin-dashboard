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

interface Almacenes {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
}
const almacenes: Almacenes[] = [
  {
    id: 1,
    nombre: 'Almacén Central',
    ubicacion: 'Ciudad Principal',
    capacidad: 1000
  },
  {
    id: 2,
    nombre: 'Almacén Secundario',
    ubicacion: 'Ciudad Secundaria',
    capacidad: 500
  }
];

const columnas = [
  {
    name: 'Nombre',
    selector: (row: Almacenes) => row.nombre,
    sortable: true
  },
  {
    name: 'Tipo de Ubicación',
    selector: (row: Almacenes) => row.ubicacion,
    sortable: true
  },
  {
    name: 'Capacidad',
    selector: (row: Almacenes) => row.capacidad,
    sortable: true
  },
  {
    name: 'Acciones',
    cell: (row: Almacenes) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/gestion-de-existencia/Almacenes/modificar-almacenes/${row.id}`}>
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
export default function AlmacenesPage() {
   const [filtro, setFiltro] = useState('');
    const datosFiltrados = almacenes.filter((u) =>
      u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      u.ubicacion.toLowerCase().includes(filtro.toLowerCase())
  
  );
  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Almacenes</CardTitle>
            <CardDescription>Listado de Almacenes</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/gestion-de-existencia/Almacenes/registrar-almacenes">
              <Button
                size="sm"
                className="h-8 gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 mt-2'>
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">
              Almacenes o Ubicación
            </label>
            <Input
              type="text"
              placeholder="Buscar almacenes..."
              className="w-full border border-gray-300 rounded-md p-2"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">

          <DataTable columns={columnas} data={datosFiltrados} progressPending={false} pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent="No hay registros para mostrar" />

        </div>
      </CardContent>
    </Card>
  );
}