'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { File, MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DataTable, { createTheme } from 'react-data-table-component';
import { useState } from 'react';

interface unidad_medidaIN {
    id: number;
    nombres: string;
    abreviatura: string;
    tipo: string;
}


const unidad_medida: unidad_medidaIN[] = [
    {
        id: 1,
        nombres: "Unidad",
        abreviatura: "und",
        tipo: "cantidad"
    },
    {
        id: 2,
        nombres: "Kilogramo",
        abreviatura: "kg",
        tipo: "peso"
    },
    {
        id: 3,
        nombres: "Gramo",
        abreviatura: "g",
        tipo: "peso"
    },
    {
        id: 4,
        nombres: "Litro",
        abreviatura: "L",
        tipo: "volumen"
    },
    {
        id: 5,
        nombres: "Mililitro",
        abreviatura: "ml",
        tipo: "volumen"
    },
    {
        id: 6,
        nombres: "Metro",
        abreviatura: "m",
        tipo: "longitud"
    }

]



const columnas = [
    {
        name: 'ID',
        selector: (row: unidad_medidaIN) => row.id,
        sortable: true
    },
    {
        name: 'Nombres',
        selector: (row: unidad_medidaIN) => row.nombres,
        sortable: true
    },
    {
        name: 'Abreviatura',
        selector: (row: unidad_medidaIN) => row.abreviatura,
        sortable: true
    },
    {
        name: 'Tipo',
        selector: (row: unidad_medidaIN) => row.tipo,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: unidad_medidaIN) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/dashboard/Catalogo/unidad-medida/modificar-unidad-medida/${row.id}`}>
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

export default function UnidadMedidaPage() {
     const [selectedStatus, setSelectedStatus] = useState('Todos');
        const [searchTerm, setSearchTerm] = useState('');
        const [records, setRecords] = useState(unidad_medida);
    
        const handleFilter = (status: string, search: string) => {
            const lowercasedSearch = search.toLowerCase();
            const filteredData = unidad_medida.filter(user => {
                const matchesSearch = user.nombres.toLowerCase().includes(lowercasedSearch) ||
                    user.abreviatura.toLowerCase().includes(lowercasedSearch) ||
                    user.tipo.toLowerCase().includes(lowercasedSearch);
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
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Unidad de Medida</CardTitle>
                        <CardDescription>Listado de Unidades de Medidas</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/dashboard/Catalogo/unidad-medida/registrar-unidad-medida">
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
            <CardContent>
                {/* <div className='grid grid-cols-12 gap-4 mt-2'>
                                    <div className="col-span-12 md:col-span-4">
                                        <label className="block mb-1 font-medium">
                                            Unidad de Medida
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Buscar Unidad de Medida..."
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    
                                </div> */}
                <div className="w-full overflow-x-auto">

                    <DataTable columns={columnas} data={unidad_medida} progressPending={false} pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                        paginationComponentOptions={paginacionOpciones}
                        noDataComponent="No hay registros para mostrar" />

                </div>
            </CardContent>
        </Card>
    );
}