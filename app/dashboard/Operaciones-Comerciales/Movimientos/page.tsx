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
import { Input } from '@/components/ui/input';
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
import { useState } from 'react';
import { Selected } from '@/components/ui/Select';

interface movimientos {
    id: number;
    tipo_movimiento: string;
    fecha_documento: string;
    numero_documento: string;
    fecha_movimiento: string;
}

const movimientos: movimientos[] = [
    {
        id: 1,
        tipo_movimiento: 'Ingreso por Compra',
        fecha_documento: '2023-01-01',
        numero_documento: 'MOV-001',
        fecha_movimiento: '2023-01-01'
    }, 
    {
        id: 2,
        tipo_movimiento: 'Salida por Venta',
        fecha_documento: '2023-01-02',
        numero_documento: 'MOV-002',
        fecha_movimiento: '2023-01-02'
    }
];

const Almacen: any[] = [
    { value: 1, label: 'Almacén A' },
    { value: 2, label: 'Almacén B' },
    { value: 3, label: 'Almacén C' }
]

const columnas = [
    {
        name: 'Tipo de Movimientos',
        selector: (row: movimientos) => row.tipo_movimiento,
        sortable: true
    },
    {
        name: 'Fecha de Documento',
        selector: (row: movimientos) => row.fecha_documento,
        sortable: true
    },
    {
        name: 'Numeros de Documento',
        selector: (row: movimientos) => row.numero_documento,
        sortable: true
    },
    {
        name: 'Fecha de Movimiento',
        selector: (row: movimientos) => row.fecha_movimiento,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: movimientos) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/dashboard/Operaciones-Comerciales/Movimientos/modificar-movimientos/${row.id}`}>
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
export default function MovimientosPage() {

    const [filtro, setFiltro] = useState('');
    const datosFiltrados = movimientos.filter((u) =>
        u.numero_documento.toLowerCase().includes(filtro.toLowerCase()) ||
        u.tipo_movimiento.toLowerCase().includes(filtro.toLowerCase())

    );

    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Movimiento</CardTitle>
                        <CardDescription>Listado de Movimientos</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/dashboard/Operaciones-Comerciales/Movimientos/registrar-movimientos">
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
                            Tipo de Movimiento
                        </label>
                        <Input
                            type="text"
                            placeholder="Buscar tipo de movimiento..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Número de Documento
                        </label>
                        <Input
                            type="text"
                            placeholder="Número de documento..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
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