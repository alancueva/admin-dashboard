'use client';

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
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from "next/navigation";

export default function ModificarUnidadMedida() {
    const { id } = useParams();
    const tipo: any[] = [
        { value: 'cantidad', label: 'cantidad' },
        { value: 'peso', label: 'peso' },
        { value: 'volumen', label: 'volumen' },
        { value: 'longitud', label: 'longitud' }
    ]
    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Modificar Unidad de Medida (Ver Registro)</CardTitle>
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

                            <Link href="/Catalogo/unidad-medida">
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
                        {/* Nombre  */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Nombres de Unidad de Medida
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombres de Unidad de Medida"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Abreviatura
                            </label>
                            <Input
                                type="text"
                                placeholder="Abreviatura"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Tipo
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {tipo.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label}
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