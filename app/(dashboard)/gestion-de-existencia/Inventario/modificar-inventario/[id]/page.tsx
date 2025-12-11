'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    Calendar
} from 'lucide-react';
import { useParams } from "next/navigation";

const Almacen: any[] = [
    { value: 'almacen1', label: 'Almacén Principal' },
    { value: 'almacen2', label: 'Almacén Secundario' },
    { value: 'almacen3', label: 'Almacén Externo' }
];

const producto: any[] = [
    { value: 'producto1', label: 'Producto 1' },
    { value: 'producto2', label: 'Producto 2' },
    { value: 'producto3', label: 'Producto 3' }
];

const ubicacion: any[] = [
    { value: 'ubicacion1', label: 'Ubicación 1' },
    { value: 'ubicacion2', label: 'Ubicación 2' },
    { value: 'ubicacion3', label: 'Ubicación 3' }
];

const estado: any[] = [
    { value: 'disponible', label: 'Disponible' },
    { value: 'reservado', label: 'Reservado' },
    { value: 'danado', label: 'Dañado' },
    { value: 'vencido', label: 'Vencido' }
];

export default function ModificarInventarioForm() {
    const { id } = useParams();
    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Modificar Inventario (Ver Registro)</CardTitle>
                        <p>ID recibido: {id}</p>
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

                            <Link href="/gestion-de-existencia/Inventario">
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

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Productos
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {producto.map((prod) => (
                                    <option key={prod.value} value={prod.value}>
                                        {prod.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Almacén
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {Almacen.map((alm) => (
                                    <option key={alm.value} value={alm.value}>
                                        {alm.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Ubicación
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {ubicacion.map((ubi) => (
                                    <option key={ubi.value} value={ubi.value}>
                                        {ubi.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/*   */}
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Cantidad Disponible</label>
                            <Input
                                type="Number"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        {/*   */}
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Numero de Serie</label>
                            <Input
                                type="text"
                                placeholder="eje. 123456789"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Fecha fabricación</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Fecha Vencimiento</label>
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
                                Estado
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {estado.map((est) => (
                                    <option key={est.value} value={est.value}>
                                        {est.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
