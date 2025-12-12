"Use client";

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

export default function RegistrarTipoNegocio() {

    const TipoNegocio: any[] = [
        { value: '1', label: 'Comercial' },
        { value: '2', label: 'Industrial' },
        { value: '3', label: 'Servicios' },
        { value: '4', label: 'Educación' },
        { value: '5', label: 'Salud' },
        { value: '6', label: 'Tecnología' },
        { value: '7', label: 'Transporte' },
        { value: '8', label: 'Turismo' },

    ];

    const TipoDocumento: any[] = [
        { value: '1', label: 'RUC' },
        { value: '2', label: 'DNI' },
        { value: '3', label: 'CEX' },
        { value: '4', label: 'PASAPORTE' },
    ];

    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Registrar Negocio</CardTitle>

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

                            <Link href="/Administracion/tipos-negocio">
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
                        {/* Nombre del Usuario */}
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Nombre de Negocio
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombre de Negocio"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-7">
                            <label className="block mb-1 font-medium">
                                Descripción de Negocio
                            </label>
                            <Input
                                type="text"
                                placeholder="Descripción de Negocio"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Vigencia
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2" disabled={true} defaultValue="SI">
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}