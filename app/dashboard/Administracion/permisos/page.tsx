'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import DataTable, { createTheme } from 'react-data-table-component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface permisos {
  id: number;
  nombre: string;
  modulo_activo: number;
  opción_activo: number;
  acción_activo: number;
}

const permiso: permisos[] = [
  {
    id: 1,
    nombre: 'Alan',
    modulo_activo: 4,
    opción_activo: 2,
    acción_activo: 2
  }
];

const columnas = [
  {
    name: 'Nº',
    selector: (row: permisos) => row.id,
    sortable: true
  },
  {
    name: 'Nombre de usuario',
    selector: (row: permisos) => row.nombre,
    sortable: true
  },
  {
    name: 'Modulo Activo',
    selector: (row: permisos) => row.modulo_activo,
    sortable: true
  },
  {
    name: 'Opción Activo',
    selector: (row: permisos) => row.opción_activo,
    sortable: true
  },
  {
    name: 'Acción Activo',
    selector: (row: permisos) => row.acción_activo,
    sortable: true
  },
  {
    name: 'Acciones',
    cell: (row: permisos) => (
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
              href={`/dashboard/Administracion/permisos/modificar-permisos/${row.id}`}
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

export default function PermisosPage() {
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  // const [records, setRecords] = useState(categoria);

  // const handleFilter = (status: string, search: string) => {
  //   const lowercasedSearch = search.toLowerCase();
  //   const filteredData = categoria.filter((user) => {
  //     const matchesSearch = user.nombres
  //       .toLowerCase()
  //       .includes(lowercasedSearch);
  //     return matchesSearch;
  //   });
  //   setRecords(filteredData);
  // };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSearchTerm = e.target.value;
  //   setSearchTerm(newSearchTerm);
  //   handleFilter(selectedStatus, newSearchTerm);
  // };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Permisos</CardTitle>
            <CardDescription>
              Listado de todos los Permisos de Usuarios
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/Administracion/permisos/registrar-permisos">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">Buscar Usuarios</label>
            <Input
              type="text"
              placeholder="Buscar Usuarios..."
              // value={filtro}
              // onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnas}
            data={permiso}
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
