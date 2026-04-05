'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams, useRouter } from 'next/navigation';
import { AdminUsuarioService } from 'app/service/administracion/adminUsuario.service';
import { useState } from 'react';
import { usuarioUpdate } from 'app/types/administracion/adminUsuario';

export default function ModificarUsuario() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const { id } = useParams();

  const rolOptions = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Usuario' }
  ];

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    // if (!validate()) return;

    // setIsSubmitting(true);
    try {
      await AdminUsuarioService.modificar(formData);
      // setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Aquí podrías mostrar un toast de error si tuvieras uno configurado
    } finally {
      // setIsSubmitting(false);
    }
  };

  const [formData, setFormData] = useState<usuarioUpdate>({
    id_usuarios: 1,
    id_rol: 1,
    id_organizaciones: 1,
    usu_dni: '',
    usu_nombre: '',
    usu_apellido_materno: '',
    usu_apellido_paterno: '',
    usu_contrasenia: '',
    usu_numero_tel: '',
    usu_correo: '',
    usu_vigencia: 'SI',
    usuarioCreacion: 'ADMIN' // Valor por defecto o tomar del contexto de auth
  });

  const InputError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {message}
      </div>
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validación específica para DNI: solo números y máximo 8 dígitos
    if (name === 'dni') {
      if (!/^\d*$/.test(value)) return; // Solo permite números
      if (value.length > 8) return; // Máximo 8 caracteres
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error al escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Modificar Usuario (Ver Registro)</CardTitle>
            <p>ID recibido: {id}</p>
            <div className="ml-auto flex items-center gap-2">
              {/*  onClick={handleSubmit} */}
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  grabar
                </span>
              </Button>

              <Link href="/dashboard/Administracion/usuarios">
                <Button size="sm" className="h-8 gap-1">
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
            {/* Rol */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <label className="block mb-1 font-medium">
                Rol <span className="text-red-500">*</span>
              </label>
              <select
                name="id_rol"
                value={formData.id_rol}
                onChange={handleChange}
                className={`w-full border rounded-md p-2 ${
                  errors.id_rol ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione</option>
                {rolOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <InputError message={errors.id_rol} />
            </div>

            {/* Organización */}
            {/*<div className="col-span-12 md:col-span-6 lg:col-span-3">
              <label className="block mb-1 font-medium">
                Organización <span className="text-red-500">*</span>
              </label>
              <select
                name="id_organizaciones"
                value={formData.id_organizaciones}
                onChange={handleChange}
                className={`w-full border rounded-md p-2 ${
                  errors.id_organizaciones
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <option value="">Seleccione</option>
                {orgOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <InputError message={errors.id_organizaciones} />
            </div>*/}

            {/* DNI */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <label className="block mb-1 font-medium">
                DNI <span className="text-red-500">*</span>
              </label>
              <Input
                name="dni"
                value={formData.usu_dni}
                onChange={handleChange}
                type="text"
                placeholder="DNI"
                className={errors.usu_dni ? 'border-red-500' : ''}
              />
              <InputError message={errors.usu_dni} />
            </div>

            {/* Vigencia (Opcional en form, default SI)


              value={formData.vigencia}*/}
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <label className="block mb-1 font-medium">Vigencia</label>
              <select
                name="vigencia"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Nombre del Usuario */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Nombres <span className="text-red-500">*</span>
              </label>
              <Input
                name="nombre"
                value={formData.usu_nombre}
                onChange={handleChange}
                type="text"
                placeholder="Nombre del usuario"
                className={errors.usu_nombre ? 'border-red-500' : ''}
              />
              <InputError message={errors.usu_nombre} />
            </div>

            {/* Apellido Paterno */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Apellido Paterno <span className="text-red-500">*</span>
              </label>
              <Input
                name="apellido_paterno"
                value={formData.usu_apellido_paterno}
                onChange={handleChange}
                type="text"
                placeholder="Apellido Paterno"
                className={errors.usu_apellido_paterno ? 'border-red-500' : ''}
              />
              <InputError message={errors.usu_apellido_paterno} />
            </div>

            {/* Apellido Materno */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Apellido Materno</label>
              <Input
                name="apellido_materno"
                value={formData.usu_apellido_materno}
                onChange={handleChange}
                type="text"
                placeholder="Apellido Materno"
              />
            </div>

            {/* Email */}
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                name="email"
                value={formData.usu_correo}
                onChange={handleChange}
                type="text"
                placeholder="Ej. usuario@ejemplo.com"
                className={errors.usu_correo ? 'border-red-500' : ''}
              />
              <InputError message={errors.usu_correo} />
            </div>

            {/* Contraseña */}
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <Input
                name="contrasenia"
                value={formData.usu_contrasenia}
                onChange={handleChange}
                type="password"
                placeholder="Contraseña"
                className={errors.usu_contrasenia ? 'border-red-500' : ''}
              />
              <InputError message={errors.usu_contrasenia} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
