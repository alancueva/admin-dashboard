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

interface orden_compra {
    id: number;
    numero_orden: string;
    entidad: string;
    almacen: string;
    estado: string;
    subtotal: number;
    impuesto: number;
    total: number;
    fecha_orden: string;
}

const orden_compra_comerciales: orden_compra[] = [
    {
        id: 1,
        numero_orden: 'OC-001',
        entidad: 'Empresa ABC S.A.',
        almacen: 'Almacén Central',
        estado: 'pendiente',
        subtotal: 1000,
        impuesto: 180,
        total: 1180,
        fecha_orden: '2024-06-01'
    },
    {
        id: 2,
        numero_orden: 'OC-002',
        entidad: 'Empresa XYZ S.A.',
        almacen: 'Almacén Secundario',
        estado: 'completada',
        subtotal: 2000,
        impuesto: 360,
        total: 2360,
        fecha_orden: '2024-06-02'
    },
    {
        id: 3,  
        numero_orden: 'OC-003',
        entidad: 'Empresa LMN S.A.',
        almacen: 'Almacén Central',
        estado: 'pendiente',
        subtotal: 1500,
        impuesto: 270,
        total: 1770,
        fecha_orden: '2024-06-03'
    }
];


const estado_opciones: any[] = [
    { value: 'pendiente', label: 'pendiente' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'completada', label: 'completada' },
    { value: 'cancelada', label: 'cancelada' }
];

const almacen_comercial:any[] = [
    { value: 1, label: 'Almacén Central' },
    { value: 2, label: 'Almacén Secundario' }
];

const columnas = [
    {
        name: 'Numero de Orden',
        selector: (row: orden_compra) => row.numero_orden,
        sortable: true
    },
    {
        name: 'Entidad',
        selector: (row: orden_compra) => row.entidad,
        sortable: true
    },
    {
        name: 'Almacén',
        selector: (row: orden_compra) => row.almacen,
        sortable: true
    },
    {
        name: 'Estado',
        selector: (row: orden_compra) => row.estado,
        sortable: true
    },
    {
        name: 'Subtotal',
        selector: (row: orden_compra) => row.subtotal,
        sortable: true
    },
    {
        name: 'Impuesto',
        selector: (row: orden_compra) => row.impuesto,
        sortable: true
    },
    {
        name: 'Total',
        selector: (row: orden_compra) => row.total,
        sortable: true
    },
    {
        name: 'Fecha de Orden',
        selector: (row: orden_compra) => row.fecha_orden,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: orden_compra) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/Operaciones-Comerciales/Orden-de-Compra/modificar-orden-de-compra/${row.id}`}>
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
export default function OrdenCompraPage() {

    const [almacen, setAlmacen] = useState(null);
    const [estado, setEstado] = useState(null);

    const [filtro, setFiltro] = useState('');
        const datosFiltrados = orden_compra_comerciales.filter((u) =>
            u.numero_orden.toLowerCase().includes(filtro.toLowerCase()) 
    
        );

    const EstadoChange = (value: any) => {
        console.log("value:", value);
        setEstado(value);
    };

    const AlmacenChange = (value: any) => {
        console.log("value:", value);
        setAlmacen(value);
    };


    return (
        <Card className="p-0 overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Orden De Compra</CardTitle>
                        <CardDescription>Listado de Ordenes de Compra</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Operaciones-Comerciales/Orden-de-Compra/registrar-orden-de-compra">
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
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Número de Orden
                        </label>
                        <Input
                            type="text"
                            placeholder="Número de orden..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Razón Social (Entidad)
                        </label>
                        <Input
                            type="text"
                            placeholder="Razón social..."
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Almacen
                        </label>
                        <Selected
                            value={almacen}
                            onChange={AlmacenChange}
                            options={almacen_comercial}
                            placeholder='Seleccione'
                            isDisabled={false}
                        />
                    </div>

                    <div className="col-span-12 md:col-span-2">
                        <label className="block mb-1 font-medium">
                            Estado
                        </label>
                        <Selected
                            value={estado}
                            onChange={EstadoChange}
                            options={estado_opciones}
                            placeholder='Seleccione'
                            isDisabled={false}
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