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

export default function RegistrarOrganizacion() {

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
                        <CardTitle>Registrar Organización</CardTitle>

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

                            {/* <Link href="/Administracion/usuarios">
                                <Button
                                size="sm"
                                className="h-8 gap-1"
                                >
                                <ArrowLeftRight className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Volver
                                </span>
                                </Button>
                            </Link> */}
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
                                Nombre de la Organización
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombre de la Organización"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Tipo de Negocio
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {TipoNegocio.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Tipo de Documento
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {TipoDocumento.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Nº Documento
                            </label>
                            <Input
                                type="text"
                                placeholder="Nº Documento"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <label className="block mb-1 font-medium">
                                Dirección
                            </label>
                            <Input
                                type="text"
                                placeholder="Dirección"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Email
                            </label>
                            <Input
                                type="text"
                                placeholder="Ej. organizacion@ejemplo.com"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Teléfono
                            </label>
                            <Input
                                type="text"
                                placeholder="Teléfono"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>


                    </form>
                </CardContent>
            </Card>
        </div>
    );
}