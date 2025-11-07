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
import { Selected } from '@/components/ui/Select';
import { useState } from 'react';


const tipo_entidad: any[] = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Proveedor' },
    { value: 3, label: 'Transportista' }
]

const tipo_documento: any[] = [
    { value: 1, label: 'RUC' },
    { value: 2, label: 'DNI' },
    { value: 3, label: 'CEX' }
]


export default function RegistroEntidadForm() {


    const [tipoEntidad, setTipoEntidad] = useState(null);
    const [tipoDocumento, setTipoDocumento] = useState(null);

    const tipoEntidadChange = (value: any) => {
        console.log("value:", value);
        setTipoEntidad(value);
    };

    const tipoDocumentoChange = (value: any) => {
        console.log("value:", value);
        setTipoDocumento(value);
    };

    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Registrar Entidad</CardTitle>

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

                            <Link href="/Operaciones-Comerciales/Entidad">
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
                                Tipo de Entidad
                            </label>
                            <Selected
                                value={tipoEntidad}
                                onChange={tipoEntidadChange}
                                options={tipo_entidad}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Tipo de Documento
                            </label>
                            <Selected
                                value={tipoDocumento}
                                onChange={tipoDocumentoChange}
                                options={tipo_documento}
                                placeholder='Seleccione'
                                isDisabled={false}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Número de Documento
                            </label>
                            <Input
                                type="text"
                                placeholder="Número de documento..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <label className="block mb-1 font-medium">
                                Razón Social
                            </label>
                            <Input
                                type="text"
                                placeholder="Razón social..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Sigla
                            </label>
                            <Input
                                type="text"
                                placeholder="Sigla..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Nombre Comercial
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombre comercial..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <label className="block mb-1 font-medium">
                                Dirección
                            </label>
                            <Input
                                type="text"
                                placeholder="Dirección..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Teléfono
                            </label>
                            <Input
                                type="text"
                                placeholder="Teléfono..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Email
                            </label>
                            <Input
                                type="text"
                                placeholder="Email..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-5"></div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Nombres Contacto
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombres Contacto..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Apellidos Contacto
                            </label>
                            <Input
                                type="text"
                                placeholder="Apellidos Contacto..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Teléfono Contacto
                            </label>
                            <Input
                                type="text"
                                placeholder="Teléfono Contacto..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Email Contacto
                            </label>
                            <Input
                                type="text"
                                placeholder="Email Contacto..."
                                className="w-full border border-gray-300 rounded-md p-2"

                            />
                        </div>



                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
