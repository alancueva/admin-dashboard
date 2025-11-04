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
    SlidersVertical
} from 'lucide-react';
import {useParams} from "next/navigation";


const tipo_Almacen: any[] = [
    { value: 'almacen_general', label: 'Almacén General' },
    { value: 'almacen_secundario', label: 'Almacén Secundario' },
    { value: 'almacen_temperatura_controlada', label: 'Almacén de Temperatura Controlada' },
    { value: 'almacen_materiales_peligrosos', label: 'Almacén de Materiales Peligrosos' }
];

export default function RegistroAlmacenForm() {
    const { id } = useParams();
    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Modificar Almacenes (Ver Registro)</CardTitle>
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

                            <Link href="/Almacen-e-Inventario/Almacenes">
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
                        {/* Código de Almacén */}
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">Código de Almacén</label>
                            <Input
                                type="number"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        {/* Nombre del Producto */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 font-medium">
                                Nombre del Almacén
                            </label>
                            <Input
                                type="text"
                                placeholder="Ej. Almacén Central"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Tipo de Almacén
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {tipo_Almacen.map((tipo) => (
                                    <option key={tipo.value} value={tipo.value}>
                                        {tipo.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dirección */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 font-medium">Dirección</label>
                            <Input
                                type="text"
                                placeholder="Ej. Calle Falsa 123, Ciudad, País"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        {/* Nombre del Responsable */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 font-medium">Nombre del Responsable</label>
                            <Input
                                type="text"
                                placeholder="Ej. Juan Pérez"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        {/* Capacidad Maxima*/}
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">Capacidad Máxima</label>
                            <Input
                                type="number"
                                placeholder="0"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>


                    </form>
                </CardContent>
            </Card>
        </div>
    );
}