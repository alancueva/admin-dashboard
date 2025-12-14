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

interface Inventario {
    id: number;
    producto: string;
    cantidad: number;
    numero_serie?: string;
    estado?: string;
}

const inventario: Inventario[] = [
    {
        id: 1,
        producto: 'Producto A',
        cantidad: 100,
        numero_serie: 'PA-12345',
        estado: 'Disponible'
    },
    {
        id: 2,
        producto: 'Producto B',
        cantidad: 50,
        numero_serie: 'PB-67890',
        estado: 'Reservado'
    },
];

const columnas = [
    {
        name: 'Producto',
        selector: (row: Inventario) => row.producto,
        sortable: true
    },
    {
        name: 'Numero Serie',
        selector: (row: Inventario) => row.numero_serie,
        sortable: true
    },
    {
        name: 'Cantidad',
        selector: (row: Inventario) => row.cantidad,
        sortable: true
    },
    {
        name: 'Estado',
        selector: (row: Inventario) => row.estado,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: Inventario) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acción</DropdownMenuLabel>

                    <Link href={`/gestion-de-existencia/Inventario/modificar-inventario/${row.id}`}>
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
export default function InventarioPage() {
    // Estados para los filtros
    const [filtroProducto, setFiltroProducto] = useState('');
    const [filtroNumeroSerie, setFiltroNumeroSerie] = useState('');

    // Filtrado con ambos criterios
    const datosFiltrados = inventario.filter((u) => {
        const coincideProducto =
            u.producto.toLowerCase().includes(filtroProducto.toLowerCase());

        // Se cumple si ambos coinciden (AND)
        return coincideProducto;
    });
    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Inventario</CardTitle>
                        <CardDescription>Listado de Inventario</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/gestion-de-existencia/Inventario/registrar-inventario">
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
                    <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Producto
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtroProducto}
                            onChange={(e) => setFiltroProducto(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Número de Serie
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar Número Serie..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtroNumeroSerie}
                            onChange={(e) => setFiltroNumeroSerie(e.target.value)}
                        />
                    </div>
                    {/* <div className="col-span-12 md:col-span-3">
                        <label className="block mb-1 font-medium">
                            Ubicación
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar ubicaciones..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtroUbicacion}
                            onChange={(e) => setFiltroUbicacion(e.target.value)}
                        />
                    </div> */}
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