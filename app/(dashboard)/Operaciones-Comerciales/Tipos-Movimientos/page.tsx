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

interface tipo_movimientos {
    id: number;
    codigo: string;
    nombre: string;
    tipo: string;
}
const tipos_movimientos: tipo_movimientos[] = [
    {
        id: 1,
        codigo: 'ING-COMP',
        nombre: 'Ingreso por Compra',
        tipo: 'entrada'
    },
    {
        id: 2,
        codigo: 'ING-DEV',
        nombre: 'Ingreso por Devolución',
        tipo: 'entrada'
    }
];

const columnas = [
    {
        name: 'Código',
        selector: (row: tipo_movimientos) => row.codigo,
        sortable: true
    },
    {
        name: 'Nombre',
        selector: (row: tipo_movimientos) => row.nombre,
        sortable: true
    },
    {
        name: 'Tipo',
        selector: (row: tipo_movimientos) => row.tipo,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: tipo_movimientos) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/Operaciones-Comerciales/Tipos-Movimientos/modificar-tipo-movimiento/${row.id}`}>
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
export default function TiposMovimientoPage() {
    const [filtro, setFiltro] = useState('');
    const datosFiltrados = tipos_movimientos.filter((u) =>
        u.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        u.nombre.toLowerCase().includes(filtro.toLowerCase())

    );
    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Tipo de Movimiento</CardTitle>
                        <CardDescription>Listado de Tipos de Movimiento</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Operaciones-Comerciales/Tipos-Movimientos/registrar-tipos-de-movimientos">
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