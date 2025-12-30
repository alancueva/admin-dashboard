'use client';
import DataTable, { createTheme } from 'react-data-table-component';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { File, MoreHorizontal, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface NegocioIN {
    id: number;
    nombre: string;
    descripcion: string;
    vigencia: string;
}

const negocios: NegocioIN[] = [
    {
        id: 1,
        nombre: "Restaurante",
        descripcion: "Ofrece comidas y bebidas para consumo en el local o para llevar.",
        vigencia: "SI"
    },
    {
        id: 2,
        nombre: "Tienda de Ropa",
        descripcion: "Venta de prendas de vestir y accesorios para hombres, mujeres y niños.",
        vigencia: "SI"
    },
    {
        id: 3,
        nombre: "Ferretería",
        descripcion: "Comercializa herramientas, materiales de construcción y artículos para el hogar.",
        vigencia: "SI"
    },
    {
        id: 4,
        nombre: "Panadería",
        descripcion: "Elabora y vende productos de panificación, pasteles y postres.",
        vigencia: "NO"
    },
    {
        id: 5,
        nombre: "Salón de Belleza",
        descripcion: "Ofrece servicios de peluquería, manicura, maquillaje y tratamientos estéticos.",
        vigencia: "SI"
    }

]



const columnas = [
    {
        name: 'ID',
        selector: (row: NegocioIN) => row.id,
        sortable: true
    },
    {
        name: 'Nombres',
        selector: (row: NegocioIN) => row.nombre,
        sortable: true
    },
    {
        name: 'Descripción',
        selector: (row: NegocioIN) => row.descripcion,
        sortable: true
    },
    {
        name: 'Vigencia',
        selector: (row: NegocioIN) => row.descripcion,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: NegocioIN) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/dashboard/Administracion/tipos-negocio/modificar-negocio/${row.id}`}>
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

export default function TipoNegocioPage() {


    const [selectedStatus, setSelectedStatus] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [records, setRecords] = useState(negocios);

    const handleFilter = (status: string, search: string) => {
        const lowercasedSearch = search.toLowerCase();
        const filteredData = negocios.filter(user => {
            const matchesStatus = status === 'Todos' || user.vigencia === status;
            const matchesSearch = user.nombre.toLowerCase().includes(lowercasedSearch) ||
                user.descripcion.toLowerCase().includes(lowercasedSearch);
            return matchesStatus && matchesSearch;
        });
        setRecords(filteredData);
    };

    const estado = [
        { id: "Todos", status: 'Todos' },
        { id: "SI", status: 'SI' },
        { id: "NO", status: 'NO' }
    ];

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        handleFilter(status, searchTerm);
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
                        <CardTitle>Tipos de Negocios</CardTitle>
                        <CardDescription>Listado de Tipos de Negocios</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/dashboard/Administracion/tipos-negocio/registrar-negocio">
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

                <div className='grid grid-cols-12 gap-4 mt-2'>
                    <div className="col-span-12 md:col-span-4">
                        <label className="block mb-1 font-medium">
                            Nombre
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar Nombres..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Vigencia
                        </label>
                        <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={selectedStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            {estado.map((est) => (
                                <option key={est.id} value={est.status}>
                                    {est.status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>



                <div className="w-full overflow-x-auto">

                    <DataTable columns={columnas} data={negocios} progressPending={false} pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                        paginationComponentOptions={paginacionOpciones}
                        noDataComponent="No hay registros para mostrar" />

                </div>
            </CardContent>
        </Card>
    );
}