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

interface cajaIn {
  id: number;
  arqueo: string;
  fecha_movimiento: string;
  tipo_movimiento: string;
  monto: number;
  descripcion: string;
}

const caja: cajaIn[] = [
  {
    id: 1,
    arqueo: '27 de arbil de 2026',
    fecha_movimiento: '27-04-2026 08:00',
    tipo_movimiento: 'Egreso',
    monto: 1200,
    descripcion: 'compras de gaseosa'
  }
];

const columnas = [
  {
    name: 'Nº',
    selector: (row: cajaIn) => row.id,
    sortable: true
  },
  {
    name: 'Arqueo',
    selector: (row: cajaIn) => row.arqueo,
    sortable: true
  },
  {
    name: 'Fecha Movimiento',
    selector: (row: cajaIn) => row.fecha_movimiento,
    sortable: true
  },
  {
    name: 'Tipo Movimiento',
    selector: (row: cajaIn) => row.tipo_movimiento,
    sortable: true
  },
  {
    name: 'Monto',
    selector: (row: cajaIn) => row.monto,
    sortable: true
  },
  {
    name: 'Descripcion',
    selector: (row: cajaIn) => row.descripcion,
    sortable: true
  },
  {
    name: 'Acciones',
    cell: (row: cajaIn) => (
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
              href={`/dashboard/caja/caja-movimiento/modificar-caja-movimiento/${row.id}`}
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

export default function CategoriaPage() {
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
            <CardTitle>Caja Movimientos</CardTitle>
            <CardDescription>Listado de Caja Movimientos</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/caja/caja-movimiento/registrar-caja-movimiento">
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
            <label className="block mb-1 font-medium">Buscar</label>
            <Input
              type="text"
              placeholder="caja..."
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
            data={caja}
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
