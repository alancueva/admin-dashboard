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

const zonas: any[] = [
    { value: 'ZonaA', label: 'Zona A' },
    { value: 'ZonaB', label: 'Zona B' }
];

export default function RegistroUbicacionForm() {
    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Registrar Ubicación</CardTitle>

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

                            <Link href="/dashboard/gestion-de-existencia/Ubicaciones">
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
                                Zona
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {zonas.map((zona) => (
                                    <option key={zona.value} value={zona.value}>
                                        {zona.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Código  */}
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">Código</label>
                            <Input
                                type="text"
                                placeholder="Ej. UB-001"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        {/* Nombre  */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block mb-1 font-medium">
                                Nombre 
                            </label>
                            <Input
                                type="text"
                                placeholder="Ej. Ubicacion A1"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>


                        {/* Descripción */}
                        <div className="col-span-12">
                            <label className="block mb-1 font-medium">Descripción</label>
                            <textarea
                                placeholder="Describe brevemente la ubicación..."
                                className="w-full border border-gray-300 rounded-md p-2"
                                rows={3}
                            ></textarea>
                        </div>

                        {/* Capacidad  */}
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Capacidad
                            </label>
                            <Input
                                type="number"
                                placeholder="Ej. 100"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
