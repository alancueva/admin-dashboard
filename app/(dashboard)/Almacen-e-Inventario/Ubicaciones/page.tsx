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

interface Ubicaciones {
    id: number;
    zona: string;
    nombre: string;
    descripcion: string;
}

const ubicaciones: Ubicaciones[] = [
    {
        id: 1,
        nombre: 'Ubicación A1',
        descripcion: 'Descripción de la Ubicación A1',
        zona: 'Zona A'
    },
    {
        id: 2,
        nombre: 'Ubicación B1',
        descripcion: 'Descripción de la Ubicación B1',
        zona: 'Zona B'
    }
];
const columnas = [
    {
        name: 'Zona',
        selector: (row: Ubicaciones) => row.zona,
        sortable: true
    },
    {
        name: 'Nombre',
        selector: (row: Ubicaciones) => row.nombre,
        sortable: true
    },
    {
        name: 'Descripción',
        selector: (row: Ubicaciones) => row.descripcion,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: Ubicaciones) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acción</DropdownMenuLabel>

                    <Link href={`/Almacen-e-Inventario/Ubicaciones/modificar-ubicacion/${row.id}`}>
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
export default function UbicacionPage() {
    // Estados para los filtros
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroZonas, setFiltroZonas] = useState('');

    // Filtrado con ambos criterios
    const datosFiltrados = ubicaciones.filter((u) => {
        const coincideNombre =
            u.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) ||
            u.descripcion.toLowerCase().includes(filtroNombre.toLowerCase());

        const coincideZonas = u.zona
            .toLowerCase()
            .includes(filtroZonas.toLowerCase());

        // Se cumple si ambos coinciden (AND)
        return coincideNombre && coincideZonas;
    });


    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Ubicación</CardTitle>
                        <CardDescription>Listado de Ubicaciones</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Almacen-e-Inventario/Ubicaciones/registrar-ubicacion">
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
                            Zonas
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar Zonas..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtroZonas}
                            onChange={(e) => setFiltroZonas(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <label className="block mb-1 font-medium">
                            Ubicación (Nombre o Descripción)
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar Ubicación..."
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
                        noDataComponent="No hay registros para mostrar" />

                </div>
            </CardContent>
        </Card>
    );
}