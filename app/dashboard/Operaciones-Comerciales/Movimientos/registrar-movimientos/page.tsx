"use client";

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';


import Link from 'next/link';
import {
    Home,
    PlusCircle,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
    Users2,
    ArrowLeftRight,
    Check,
    ShieldPlus,
    SlidersVertical,
    Calendar,
    MoreHorizontal,
    Plus
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Selected } from '@/components/ui/Select';
import { useState } from 'react';
import DataTable from 'react-data-table-component';

/**
 * Tipo de Movimiento
 */
const tipo_movimientos: any[] = [
    { value: 1, label: 'Ingreso por Compra' },
    { value: 2, label: 'Ingreso por Devolución' }
]

const Almacen: any[] = [
    { value: 1, label: 'Almacén A' },
    { value: 2, label: 'Almacén B' },
    { value: 3, label: 'Almacén C' }
]

const estado_options: any[] = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
];

const entidad_comercial: any[] = [
    { value: 'entidad1', label: 'Entidad 1' },
    { value: 'entidad2', label: 'Entidad 2' },
    { value: 'entidad3', label: 'Entidad 3' }
];



interface MovimientoDetalle {
    id: number;
    movimiento_id: number;
    producto_id: number;
    ubicacion_origen_id: number;
    ubicacion_destino_id: number;

    cantidad: number;
    precio_unitario: number;
    subtotal: number;

    lote: string;
    numero_serie: string;
    fecha_vencimiento: string;
}

const movimientos_detalle: MovimientoDetalle[] = [
    {
        id: 1,
        movimiento_id: 1,
        producto_id: 2,
        ubicacion_origen_id: 1,
        ubicacion_destino_id: 2,

        cantidad: 3,
        precio_unitario: 14,
        subtotal: 42,

        lote: "L001",
        numero_serie: "NS123456",
        fecha_vencimiento: '2024-12-31'
    }
];

const columnas = [
    {
        name: 'Producto',
        selector: (row: MovimientoDetalle) => row.producto_id,
        sortable: true
    },
    {
        name: 'Ubicacion Origen',
        selector: (row: MovimientoDetalle) => row.ubicacion_origen_id,
        sortable: true
    },
    {
        name: 'Ubicacion Destino',
        selector: (row: MovimientoDetalle) => row.ubicacion_destino_id,
        sortable: true
    },
    {
        name: 'Cantidad',
        selector: (row: MovimientoDetalle) => row.cantidad,
        sortable: true
    },
    {
        name: 'Precio Unitario',
        selector: (row: MovimientoDetalle) => row.precio_unitario,
        sortable: true
    },
    {
        name: 'Lote',
        selector: (row: MovimientoDetalle) => row.lote,
        sortable: true
    },
    {
        name: 'Número de Serie',
        selector: (row: MovimientoDetalle) => row.numero_serie,
        sortable: true
    },
    {
        name: 'Fecha de Vencimiento',
        selector: (row: MovimientoDetalle) => row.fecha_vencimiento,
        sortable: true
    },
    {
        name: 'Acciones',
        cell: (row: MovimientoDetalle) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>

                        Ver Detalles

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









export default function RegistrarMovimientoPage() {
    const [tipoMovimiento, setTipoMovimiento] = useState(null);
    const [almacenDestino, setAlmacenDestino] = useState(null);
    const [almacenOrigen, setAlmacenOrigen] = useState(null);
    const [ubicacionDestino, setUbicacionDestino] = useState(null);
    const [ubicacionOrigen, setUbicacionOrigen] = useState(null);
    const [entidad, setEntidad] = useState(null);
    const [estado, setEstado] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const estadoChange = (value: any) => {
        setEstado(value);
    }


    const tipoMovimientoChange = (value: any) => {
        setTipoMovimiento(value);
    };

    const entidadChange = (value: any) => {
        setEntidad(value);
    }

    const almacenChange = (value: any) => {
        console.log("value:", value);
        setAlmacenDestino(value);
    };

    const UbicacionChange = (value: any) => {
        setUbicacionDestino(value);
    }

    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Registrar Movimientos</CardTitle>

                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <Check className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    grabar
                                </span>
                            </Button>

                            <Link href="/dashboard/Operaciones-Comerciales/Movimientos">
                                <Button
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ArrowLeftRight className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Volver
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardContent>
                    <form className="grid grid-cols-12 gap-4 mt-2">
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Fecha Movimiento</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Tipos de Movimientos
                            </label>
                            <Selected
                                value={tipoMovimiento}
                                onChange={tipoMovimientoChange}
                                options={tipo_movimientos}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Fecha Documento</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Número De Documento
                            </label>
                            <Input
                                type="text"
                                placeholder="Número De Documento"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Almacen Origen
                            </label>
                            <Selected
                                value={almacenOrigen}
                                onChange={almacenChange}
                                options={Almacen}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />

                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Destino (Ubicación)
                            </label>

                            <Input
                                type="text"
                                placeholder="Destino (Ubicación)"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Entidad
                            </label>
                            <Selected
                                value={entidad}
                                onChange={entidadChange}
                                options={entidad_comercial}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Estado
                            </label>
                            <Selected
                                value={estado}
                                onChange={estadoChange}
                                options={estado_options}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3"></div>

                        <div className="col-span-12 ">
                            <label className="block mb-1 font-medium">
                                Observaciones
                            </label>
                            <Input
                                type="text"
                                placeholder="Observaciones"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                    </form>
                </CardContent>
            </Card>

            <Card className='mt-2' >
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Detalle de Movimientos</CardTitle>

                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <Plus className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar Detalle
                                </span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="w-full">
                        <DataTable
                            columns={columnas}
                            data={movimientos_detalle}
                            progressPending={false}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                            paginationComponentOptions={paginacionOpciones}
                            noDataComponent="No hay registros para mostrar" responsive={true} />
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Agregar Detalle de Movimiento</DialogTitle>
                        <DialogDescription>
                            Ingrese los detalles del producto a agregar al movimiento.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-12 gap-4 py-4">
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 text-sm font-medium">Producto</label>
                            <Input placeholder="Buscar producto..." />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <label className="block mb-1 text-sm font-medium">Cantidad</label>
                            <Input type="number" placeholder="0" />
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <label className="block mb-1 text-sm font-medium">Precio Unit.</label>
                            <Input type="number" placeholder="0.00" />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 text-sm font-medium">Ubicación Origen</label>
                            <Selected
                                value={ubicacionDestino}
                                onChange={UbicacionChange}
                                options={Almacen}
                                placeholder="Seleccione Origen"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 text-sm font-medium">Ubicación Destino</label>
                            <Selected
                                value={ubicacionDestino}
                                onChange={UbicacionChange}
                                options={Almacen}
                                placeholder="Seleccione Destino"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 text-sm font-medium">Lote</label>
                            <Input placeholder="Lote" />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 text-sm font-medium">N° Serie</label>
                            <Input placeholder="Número de Serie" />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 text-sm font-medium">Fecha Vencimiento</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button type="submit" onClick={() => setIsDialogOpen(false)}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}