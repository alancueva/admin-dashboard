'Use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Select from 'react-select/dist/declarations/src/Select';

export default function RegistrarOrganizacion() {
  const TipoNegocio: any[] = [
    { value: '1', label: 'Comercial' },
    { value: '2', label: 'Industrial' },
    { value: '3', label: 'Servicios' },
    { value: '4', label: 'Educación' },
    { value: '5', label: 'Salud' },
    { value: '6', label: 'Tecnología' },
    { value: '7', label: 'Transporte' },
    { value: '8', label: 'Turismo' }
  ];

  const TipoDocumento: any[] = [
    { value: '1', label: 'RUC' },
    { value: '2', label: 'DNI' },
    { value: '3', label: 'CEX' },
    { value: '4', label: 'PASAPORTE' }
  ];

  const tiene_almacen: any[] = [
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' }
  ];

  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            {/* Registrar */}
            <CardTitle> Organización</CardTitle>

            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
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
          <form className="grid grid-cols-12 gap-6 mt-2">
            {/* Tipo de Negocio */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="tipo_negocio">Tipo de Negocio *</Label>
              <select
                id="tipo_negocio"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Seleccione tipo de negocio</option>
                {TipoNegocio.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre de la Organización */}
            <div className="col-span-12 md:col-span-8">
              <Label htmlFor="nombre">Nombre Comercial / Razón Social *</Label>
              <Input
                id="nombre"
                placeholder="Ej: Sabores del Perú - Restaurante"
                className="mt-1"
              />
            </div>

            {/* Tipo y Número de Documento */}
            <div className="col-span-12 md:col-span-3">
              <Label htmlFor="tipo_doc">Tipo de Documento *</Label>
              <select
                id="tipo_doc"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Seleccione</option>
                {TipoDocumento.map((doc) => (
                  <option key={doc.value} value={doc.value}>
                    {doc.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="numero_doc">Número de Documento *</Label>
              <Input
                id="numero_doc"
                placeholder="20601234567"
                className="mt-1"
              />
            </div>

            <div className="col-span-12 md:col-span-5">
              <Label htmlFor="nombre_legal">Nombre Legal / Razón Social</Label>
              <Input
                id="nombre_legal"
                placeholder="Restaurante Sabores del Perú SAC"
                className="mt-1"
              />
            </div>

            {/* Dirección */}
            <div className="col-span-12">
              <Label htmlFor="direccion">Dirección Completa *</Label>
              <Input
                id="direccion"
                placeholder="Av. Principal 123, Urb. Los Jardines"
                className="mt-1"
              />
            </div>

            {/* Ubicación */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="departamento">Departamento</Label>
              <Input id="departamento" placeholder="Lima" className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="provincia">Provincia</Label>
              <Input id="provincia" placeholder="Lima" className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="distrito">Distrito</Label>
              <Input id="distrito" placeholder="Miraflores" className="mt-1" />
            </div>

            {/* Contacto */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="telefono">Teléfono Principal *</Label>
              <Input id="telefono" placeholder="01-2345678" className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="celular">Celular / WhatsApp</Label>
              <Input id="celular" placeholder="987 654 321" className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="info@saboresdelperu.com"
                className="mt-1"
              />
            </div>

            {/* Información del Restaurante */}
            <div className="col-span-12">
              <Label htmlFor="descripcion">Descripción del Negocio</Label>
              <Textarea
                id="descripcion"
                placeholder="Restaurante familiar especializado en comida peruana tradicional..."
                rows={4}
                className="mt-1"
              />
            </div>

            {/* Capacidad y Operación */}
            {/*<div className="col-span-12 md:col-span-3">
              <Label htmlFor="capacidad">Capacidad (Personas)</Label>
              <Input
                id="capacidad"
                type="number"
                placeholder="80"
                className="mt-1"
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Label htmlFor="mesas">Número de Mesas</Label>
              <Input
                id="mesas"
                type="number"
                placeholder="25"
                className="mt-1"
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Label htmlFor="horario_apertura">Hora de Apertura</Label>
              <Input id="horario_apertura" type="time" className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Label htmlFor="horario_cierre">Hora de Cierre</Label>
              <Input id="horario_cierre" type="time" className="mt-1" />
            </div>*/}

            {/* Redes Sociales */}
            {/*<div className="col-span-12 md:col-span-6">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="@saboresdelperu"
                className="mt-1"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="facebook.com/saboresdelperu"
                className="mt-1"
              />
            </div>*/}

            {/* Notas adicionales */}
            <div className="col-span-12">
              <Label htmlFor="notas">Notas / Observaciones</Label>
              <Textarea
                id="notas"
                placeholder="Información adicional sobre el restaurante..."
                rows={3}
                className="mt-1"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
