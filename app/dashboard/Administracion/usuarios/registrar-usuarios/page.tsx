'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { AdminUsuarioService } from 'app/service/administracion/adminUsuario.service';
import { usuarioInsert } from 'app/types/administracion/adminUsuario';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export default function RegistrarUsuario() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const [formData, setFormData] = useState<usuarioInsert>({
    id_rol: 1,
    id_organizaciones: 1,
    dni: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    contrasenia: '',
    // vigencia: 'SI',
    usuarioCreacion: 'ADMIN' // Valor por defecto o tomar del contexto de auth
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const rolOptions = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Usuario' }
  ];

  // Mock de organizaciones - idealmente vendría de un servicio
  const orgOptions = [
    { value: '1', label: 'Organización Principal' },
    { value: '2', label: 'Sucursal Norte' }
  ];

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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.id_rol) newErrors.id_rol = 'El rol es obligatorio';
    if (!formData.id_organizaciones)
      newErrors.id_organizaciones = 'La organización es obligatoria';

    if (!formData.dni) {
      newErrors.dni = 'El DNI es obligatorio';
    } else if (formData.dni.length !== 8) {
      newErrors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellido_paterno)
      newErrors.apellido_paterno = 'El apellido paterno es obligatorio';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    if (!formData.contrasenia)
      newErrors.contrasenia = 'La contraseña es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      console.log(formData);
      await AdminUsuarioService.insertar(formData);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Aquí podrías mostrar un toast de error si tuvieras uno configurado
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Verificar si hay datos ingresados (excluyendo valores por defecto)
    const hasData =
      formData.id_rol !== 0 ||
      formData.id_organizaciones !== 1 ||
      formData.dni !== '' ||
      formData.nombre !== '' ||
      formData.apellido_paterno !== '' ||
      formData.apellido_materno !== '' ||
      formData.email !== '' ||
      formData.contrasenia !== '';

    if (hasData) {
      setShowExitDialog(true);
    } else {
      router.push('/dashboard/Administracion/usuarios');
    }
  };

  const InputError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {message}
      </div>
    );
  };

  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Registrar Usuario</CardTitle>

            {/*onClick={handleSubmit}
          disabled={isSubmitting} */}
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {isSubmitting ? 'Guardando...' : 'Grabar'}
                </span>
              </Button>

              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={handleBack}
                variant="outline"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Volver
                </span>
              </Button>
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
                value={formData.dni}
                onChange={handleChange}
                type="text"
                placeholder="DNI"
                className={errors.dni ? 'border-red-500' : ''}
              />
              <InputError message={errors.dni} />
            </div>

            {/* Vigencia (Opcional en form, default SI)

             value={formData.vigencia} */}
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
                value={formData.nombre}
                onChange={handleChange}
                type="text"
                placeholder="Nombre del usuario"
                className={errors.nombre ? 'border-red-500' : ''}
              />
              <InputError message={errors.nombre} />
            </div>

            {/* Apellido Paterno */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">
                Apellido Paterno <span className="text-red-500">*</span>
              </label>
              <Input
                name="apellido_paterno"
                value={formData.apellido_paterno}
                onChange={handleChange}
                type="text"
                placeholder="Apellido Paterno"
                className={errors.apellido_paterno ? 'border-red-500' : ''}
              />
              <InputError message={errors.apellido_paterno} />
            </div>

            {/* Apellido Materno */}
            <div className="col-span-12 md:col-span-4">
              <label className="block mb-1 font-medium">Apellido Materno</label>
              <Input
                name="apellido_materno"
                value={formData.apellido_materno}
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
                value={formData.email}
                onChange={handleChange}
                type="text"
                placeholder="Ej. usuario@ejemplo.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              <InputError message={errors.email} />
            </div>

            {/* Contraseña */}
            <div className="col-span-12 md:col-span-6">
              <label className="block mb-1 font-medium">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <Input
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleChange}
                type="password"
                placeholder="Contraseña"
                className={errors.contrasenia ? 'border-red-500' : ''}
              />
              <InputError message={errors.contrasenia} />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Diálogo de Éxito */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Registro Exitoso!</AlertDialogTitle>
            <AlertDialogDescription>
              El usuario ha sido registrado correctamente en el sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push('/dashboard/Administracion/usuarios')}
            >
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de Confirmación al Salir */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Está seguro de que desea salir?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tiene cambios sin guardar. Si sale ahora, se perderán los datos
              ingresados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push('/dashboard/Administracion/usuarios')}
            >
              Salir sin guardar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
