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
  fecha_apertura: string;
  fecha_cierre: string;
  total_esperado: number;
  monto_real: number;
  diferencia: number;
  estado: string;
}

const caja: cajaIn[] = [
  {
    id: 1,
    fecha_apertura: '27-04-2026 08:00',
    fecha_cierre: '27-04-2026 16:39',
    total_esperado: 1200,
    monto_real: 1100,
    diferencia: 100,
    estado: 'Cerrado'
  }
];
const getMetodoColor = (metodo: string) => {
  switch (metodo) {
    case 'Abierto':
      return 'bg-green-200 text-green-800';
    case 'Cerrado':
      return 'bg-blue-200 text-blue-800';
    case 'En Arqueo':
      return 'bg-purple-200 text-purple-800';
    default:
      return 'bg-gray-200';
  }
};
const columnas = [
  {
    name: 'ID',
    selector: (row: cajaIn) => row.id,
    sortable: true
  },
  {
    name: 'Fecha Apertura',
    selector: (row: cajaIn) => row.fecha_apertura,
    sortable: true
  },
  {
    name: 'Fecha Cierre',
    selector: (row: cajaIn) => row.fecha_cierre,
    sortable: true
  },
  {
    name: 'Total Esperado',
    selector: (row: cajaIn) => row.total_esperado,
    sortable: true
  },
  {
    name: 'Monto Real',
    selector: (row: cajaIn) => row.monto_real,
    sortable: true
  },
  {
    name: 'Diferencia',
    selector: (row: cajaIn) => row.diferencia,
    sortable: true
  },
  {
    name: 'Estado',
    cell: (row: cajaIn) => (
      <span
        className={`px-2 py-1 rounded text-xs ${getMetodoColor(row.estado)}`}
      >
        {row.estado}
      </span>
    ),
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
              href={`/dashboard/caja/caja-arqueo/modificar-caja-arqueo/${row.id}`}
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
            <CardTitle>Caja Arqueo</CardTitle>
            <CardDescription>Listado de Caja</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/caja/caja-arqueo/registrar-caja-arqueo">
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
