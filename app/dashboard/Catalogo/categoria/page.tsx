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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface categoriaIN {
    id: number;
    nombres: string;
    descripcion: string;
    nivel: string;
    orden: string;
}

const categoria: categoriaIN[] = [
    {
        id: 1,
        nombres: "Materias Primas",
        descripcion: "Insumos para la producción",
        nivel: "1",
        orden: "1"
    },
    {
        id: 2,
        nombres: "Productos en Proceso",
        descripcion: "Artículos semi-terminados",
        nivel: "1",
        orden: "2"
    },
    {
        id: 3,
        nombres: "Productos Terminados",
        descripcion: "Artículos listos para la venta",
        nivel: "1",
        orden: "3"
    },
    {
        id: 4,
        nombres: "Suministros de Oficina",
        descripcion: "Material de papelería y oficina",
        nivel: "1",
        orden: "4"
    },
    {
        id: 5,
        nombres: "Herramientas y Equipos",
        descripcion: "Equipamiento para operaciones",
        nivel: "1",
        orden: "5"
    }
]



const columnas = [
    {
        name: 'ID',
        selector: (row: categoriaIN) => row.id,
        sortable: true
    },
    {
        name: 'Nombres',
        selector: (row: categoriaIN) => row.nombres,
        sortable: true
    },
    {
        name: 'Descripción',
        selector: (row: categoriaIN) => row.descripcion,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: categoriaIN) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/dashboard/Catalogo/categoria/modificar-categoria/${row.id}`}>
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
    const [records, setRecords] = useState(categoria);

    const handleFilter = (status: string, search: string) => {
        const lowercasedSearch = search.toLowerCase();
        const filteredData = categoria.filter(user => {
            const matchesSearch = user.nombres.toLowerCase().includes(lowercasedSearch)
            return matchesSearch;
        });
        setRecords(filteredData);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        handleFilter(selectedStatus, newSearchTerm);
    }

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

                    <DataTable columns={columnas} data={categoria} progressPending={false} pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                        paginationComponentOptions={paginacionOpciones}
                        noDataComponent="No hay registros para mostrar" />

                </div>
            </CardContent>
        </Card>
    );
}