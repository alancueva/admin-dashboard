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

interface Productos {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  stock: number;
}

const products: Productos[] = [
  {
    id: 1,
    nombre: 'Producto 1',
    descripcion: 'Descripción del Producto 1',
    categoria: 'Materias Primas',
    stock: 15,
  },
  {
    id: 2,
    nombre: 'Producto 2',
    descripcion: 'Descripción del Producto 2',
    categoria: 'Herramientas y Equipos',
    stock: 11,
  },
  {
    id: 3,
    nombre: 'Producto 3',
    descripcion: 'Descripción del Producto 3',
    categoria: 'Materias Primas',
    stock: 5,
  },
  {
    id: 4,
    nombre: 'Producto 4',
    descripcion: 'Descripción del Producto 4',
    categoria: 'Herramientas y Equipos',
    stock: 8,
  },
  {
    id: 5,
    nombre: 'Producto 5',
    descripcion: 'Descripción del Producto 5',
    categoria: 'Materias Primas',
    stock: 10,
  },
  {
    id: 6,
    nombre: 'Producto 6',
    descripcion: 'Descripción del Producto 6',
    categoria: 'Herramientas y Equipos',
    stock: 12,
  },
];

const columnas = [
  {
    name: 'ID',
    selector: (row: Productos) => row.id,
    sortable: true,
    width: '80px',
  },
  {
    name: 'Nombre',
    selector: (row: Productos) => row.nombre,
    sortable: true,
  },
  {
    name: 'Descripción',
    selector: (row: Productos) => row.descripcion,
  },
  {
    name: 'Stock',
    selector: (row: Productos) => row.stock,
    sortable: true,
  },
  {
    name: 'Acciones',
    cell: (row: Productos) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acción</DropdownMenuLabel>

          <Link href={`/gestion-de-existencia/Productos/modifica-producto/${row.id}`}>
            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
          </Link>

          {/* <DropdownMenuItem
            onClick={() => handleEliminar(row.id)}
            className="text-red-500"
          >
            Eliminar
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    ignoreRowClick: true, // evita que el click seleccione la fila
    allowOverflow: true, // permite que el menú salga del límite
    // button: true,
  }
];


const paginacionOpciones = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function ProductPage() {
  const [filtro, setFiltro] = useState('');
  const datosFiltrados = products.filter((u) =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) &&
    u.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );
  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Productos</CardTitle>
            <CardDescription>Listado de Productos</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/gestion-de-existencia/Productos/registrar-producto">
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
              Productos (Nombre o Descripción)
            </label>
            <Input
              type="text"
              placeholder="Buscar productos..."
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
