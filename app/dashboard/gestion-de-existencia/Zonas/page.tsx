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
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Zonas {
    id: number;
    almacen: string;
    nombre: string;
    descripcion: string;
    tipo: string;
}

const zonas: Zonas[] = [
    {
        id: 1,
        almacen: 'Almacén Central',
        nombre: 'Zona A',
        descripcion: 'Descripción de la Zona A',
        tipo: 'Tipo 1'
    },
    {
        id: 2,
        almacen: 'Almacén Secundario',
        nombre: 'Zona B',
        descripcion: 'Descripción de la Zona B',
        tipo: 'Tipo 2'
    }
];
const columnas = [
    {
        name: 'Almacén',
        selector: (row: Zonas) => row.almacen,
        sortable: true
    },
    {
        name: 'Nombre',
        selector: (row: Zonas) => row.nombre,
        sortable: true
    },
    {
        name: 'Descripción',
        selector: (row: Zonas) => row.descripcion,
        sortable: true
    },
    {
        name: 'Tipo',
        selector: (row: Zonas) => row.tipo,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: Zonas) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acción</DropdownMenuLabel>

                    <Link href={`/dashboard/gestion-de-existencia/Zonas/modificar-zonas/${row.id}`}>
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
export default function ZonaPage() {
    // Estados para los filtros
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroAlmacen, setFiltroAlmacen] = useState('');

    // Filtrado con ambos criterios
    const datosFiltrados = zonas.filter((u) => {
        const coincideNombre =
            u.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) ||
            u.descripcion.toLowerCase().includes(filtroNombre.toLowerCase());

        const coincideAlmacen = u.almacen
            .toLowerCase()
            .includes(filtroAlmacen.toLowerCase());

        // Se cumple si ambos coinciden (AND)
        return coincideNombre && coincideAlmacen;
    });

    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Zona</CardTitle>
                        <CardDescription>Listado de Zonas</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/gestion-de-existencia/Zonas/registrar-zonas">
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
                            Almacenes
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar almacenes..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtroAlmacen}
                            onChange={(e) => setFiltroAlmacen(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <label className="block mb-1 font-medium">
                            Zonas (Nombre o Descripción)
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar zonas..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
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
                        noDataComponent="No hay registros para mostrar"/>

                </div>
            </CardContent>
        </Card>
    );
}