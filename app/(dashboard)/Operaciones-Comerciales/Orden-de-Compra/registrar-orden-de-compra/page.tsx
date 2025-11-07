'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
import DataTable from 'react-data-table-component';


import { Selected } from '@/components/ui/Select';
import { useState } from 'react';



const estado_opciones: any[] = [
    { value: 'pendiente', label: 'pendiente' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'completada', label: 'completada' },
    { value: 'cancelada', label: 'cancelada' }
];

const almacen_comercial: any[] = [
    { value: 1, label: 'Almacén Central' },
    { value: 2, label: 'Almacén Secundario' }
];


const Entidad_comercial: any[] = [
    { value: 1, label: 'Proveedor A' },
    { value: 2, label: 'Proveedor B' },
    { value: 3, label: 'Proveedor C' }
];






interface MovimientoDetalle {
    id: number;
    producto_id: number;
    cantidad_solicitada: number;
    cantidad_recibida: number;
    precio_unitario: number;
    subtotal: number;
    estado: string;
}

const movimientos_detalle: MovimientoDetalle[] = [
    {
        id: 1,
        producto_id: 101,
        cantidad_solicitada: 50,
        cantidad_recibida: 40,
        precio_unitario: 10.99,
        subtotal: 549.50,
        estado: 'pendiente'
    },
    {
        id: 2,
        producto_id: 102,
        cantidad_solicitada: 30,
        cantidad_recibida: 30,
        precio_unitario: 5.49,
        subtotal: 164.70,
        estado: 'completada'
    },

]


const columnas = [
    {
        name: 'Producto',
        selector: (row: MovimientoDetalle) => row.producto_id,
        sortable: true
    },
    {
        name: 'Cantidad Solicitada',
        selector: (row: MovimientoDetalle) => row.cantidad_solicitada,
        sortable: true
    },
    {
        name: 'Cantidad Recibida',
        selector: (row: MovimientoDetalle) => row.cantidad_recibida,
        sortable: true
    },
    {
        name: 'Precio Unitario',
        selector: (row: MovimientoDetalle) => row.precio_unitario,
        sortable: true
    },
    {
        name: 'Subtotal',
        selector: (row: MovimientoDetalle) => row.subtotal,
        sortable: true
    },
    {
        name: 'Estado',
        selector: (row: MovimientoDetalle) => row.estado,
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



export default function RegistroOrdenCompraForm() {

    const [almacen, setAlmacen] = useState(null);
    const [estado, setEstado] = useState(null);
    const [entidad, setEntidad] = useState(null);


    const EstadoChange = (value: any) => {
        console.log("value:", value);
        setEstado(value);
    };

    const AlmacenChange = (value: any) => {
        console.log("value:", value);
        setAlmacen(value);
    };

    const EntidadChange = (value: any) => {
        console.log("value:", value);
        setEstado(value);
    };


    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Registrar Orden de Compra</CardTitle>

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

                            <Link href="/Operaciones-Comerciales/Orden-de-Compra">
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
                <CardContent className='mt-4'>
                    <form className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Número de Orden
                            </label>
                            <Input
                                type="text"
                                placeholder="Número de orden..."
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Entidad
                            </label>
                            <Selected
                                value={almacen}
                                onChange={AlmacenChange}
                                options={Entidad_comercial}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Almacen Destino
                            </label>
                            <Selected
                                value={almacen}
                                onChange={AlmacenChange}
                                options={almacen_comercial}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Fecha de Orden</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Fecha de Entrega Esperada</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Subtotal
                            </label>
                            <Input
                                type="text"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Impuesto
                            </label>
                            <Input
                                type="text"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Total
                            </label>
                            <Input
                                type="text"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
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

                        <div className="col-span-12 md:col-span-2"></div>

                        <div className="col-span-12">
                            <label className="block mb-1 font-medium">
                                Observación
                            </label>
                            <Input
                                type="text"
                                placeholder="Ingrese una observación..."
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>






                    </form>
                    <CardHeader className="mt-6 overflow-x-auto">
                        <div className="flex items-center gap-2">
                            <CardTitle>Detalle de Orden De compra</CardTitle>

                            <div className="ml-auto flex items-center gap-2">
                                <Button
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Agregar Detalle
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4 overflow-x-auto">
                        <div className="w-full overflow-x-auto">
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
                </CardContent>
            </Card>
        </div>
    );
}
