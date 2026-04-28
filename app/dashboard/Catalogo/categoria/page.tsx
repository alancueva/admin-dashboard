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
interface CategoriaIN {
  id: number;
  nombres: string;
  descripcion: string;
  nivel: string; // "1" = principal, "2" = subcategoría
  orden: string;
  padre_id?: number | null; // Para futuras subcategorías
}

const categorias: CategoriaIN[] = [
  {
    id: 1,
    nombres: 'Entradas',
    descripcion: 'Aperitivos y entradas',
    nivel: '1',
    orden: '1'
  },
  {
    id: 2,
    nombres: 'Platos Principales',
    descripcion: 'Platos de fondo',
    nivel: '1',
    orden: '2'
  },
  {
    id: 3,
    nombres: 'Postres',
    descripcion: 'Dulces y postres',
    nivel: '1',
    orden: '3'
  },
  {
    id: 4,
    nombres: 'Bebidas',
    descripcion: 'Todas las bebidas',
    nivel: '1',
    orden: '4'
  },
  {
    id: 5,
    nombres: 'Bebidas Sin Alcohol',
    descripcion: 'Refrescos y jugos',
    nivel: '2',
    orden: '4.1',
    padre_id: 4
  },
  {
    id: 6,
    nombres: 'Bebidas Alcohólicas',
    descripcion: 'Cervezas, vinos y cócteles',
    nivel: '2',
    orden: '4.2',
    padre_id: 4
  },
  {
    id: 7,
    nombres: 'Sopas y Caldos',
    descripcion: 'Sopas tradicionales',
    nivel: '1',
    orden: '5'
  }
];

const columnas = [
  {
    name: 'ID',
    selector: (row: CategoriaIN) => row.id,
    sortable: true
  },
  {
    name: 'Nombres',
    selector: (row: CategoriaIN) => row.nombres,
    sortable: true
  },
  {
    name: 'Descripción',
    selector: (row: CategoriaIN) => row.descripcion,
    sortable: true
  },
  {
    name: 'Acciones',
    cell: (row: CategoriaIN) => (
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
              href={`/dashboard/Catalogo/categoria/modificar-categoria/${row.id}`}
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
  const [records, setRecords] = useState(categorias);

  const handleFilter = (status: string, search: string) => {
    const lowercasedSearch = search.toLowerCase();
    const filteredData = categorias.filter((user) => {
      const matchesSearch = user.nombres
        .toLowerCase()
        .includes(lowercasedSearch);
      return matchesSearch;
    });
    setRecords(filteredData);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleFilter(selectedStatus, newSearchTerm);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div>
            <CardTitle>Categoria</CardTitle>
            <CardDescription>Listado de Categorias</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/Catalogo/categoria/registrar-categoria">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      {/* <div className='grid grid-cols-12 gap-4 mt-2'>
                                <div className="col-span-12 md:col-span-4">
                                    <label className="block mb-1 font-medium">
                                        Categorias
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Buscar categorias..."
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        onChange={handleSearchChange}
                                    />
                                </div>

                            </div> */}
      <CardContent>
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columnas}
            data={categorias}
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
