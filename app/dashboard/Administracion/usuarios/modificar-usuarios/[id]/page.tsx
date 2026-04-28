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
import { Label } from '@/components/ui/label';

export default function ModificarUsuario() {
  const { id } = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const [formData, setFormData] = useState({
    id_rol: '',
    id_organizaciones: '',
    usu_dni: '',
    usu_nombre: '',
    usu_apellido_paterno: '',
    usu_apellido_materno: '',
    usu_contrasenia: '',
    usu_numero_tel: '',
    usu_correo: '',
    usu_vigencia: 'SI'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const rolOptions = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Cajero' },
    { value: '3', label: 'Mesero' },
    { value: '4', label: 'Almacenero' }
  ];

  const orgOptions = [
    { value: '1', label: 'Restaurante Principal' },
    { value: '2', label: 'Sucursal Sur' },
    { value: '3', label: 'Sucursal Norte' }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validación en tiempo real para DNI
    if (name === 'usu_dni') {
      if (!/^\d*$/.test(value) || value.length > 8) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.id_rol) newErrors.id_rol = 'Debe seleccionar un rol';
    if (!formData.id_organizaciones)
      newErrors.id_organizaciones = 'Debe seleccionar una organización';
    if (!formData.usu_dni || formData.usu_dni.length !== 8) {
      newErrors.usu_dni = 'El DNI debe tener 8 dígitos';
    }
    if (!formData.usu_nombre?.trim())
      newErrors.usu_nombre = 'El nombre es obligatorio';
    if (!formData.usu_apellido_paterno?.trim())
      newErrors.usu_apellido_paterno = 'El apellido paterno es obligatorio';
    if (!formData.usu_correo?.trim()) {
      newErrors.usu_correo = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.usu_correo)) {
      newErrors.usu_correo = 'El correo no tiene un formato válido';
    }
    if (!formData.usu_contrasenia)
      newErrors.usu_contrasenia = 'La contraseña es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log('Datos a guardar:', formData);
      // await AdminUsuarioService.insertar(formData);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar el usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    const hasChanges = Object.values(formData).some(
      (value) => value !== '' && value !== 'SI' && value !== '1'
    );

    if (hasChanges) {
      setShowExitDialog(true);
    } else {
      router.push('/dashboard/Administracion/usuarios');
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
          <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
            {/* Rol */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label htmlFor="id_rol">
                Rol <span className="text-red-500">*</span>
              </Label>
              <select
                id="id_rol"
                name="id_rol"
                value={formData.id_rol}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-md p-2 ${errors.id_rol ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Seleccione un rol</option>
                {rolOptions.map((rol) => (
                  <option key={rol.value} value={rol.value}>
                    {rol.label}
                  </option>
                ))}
              </select>
              {errors.id_rol && (
                <p className="text-red-500 text-xs mt-1">{errors.id_rol}</p>
              )}
            </div>

            {/* Organización */}
            {/*
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <Label htmlFor="id_organizaciones">
                Organización <span className="text-red-500">*</span>
              </Label>
              <select
                id="id_organizaciones"
                name="id_organizaciones"
                value={formData.id_organizaciones}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-md p-2 ${errors.id_organizaciones ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Seleccione una organización</option>
                {orgOptions.map((org) => (
                  <option key={org.value} value={org.value}>
                    {org.label}
                  </option>
                ))}
              </select>
              {errors.id_organizaciones && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.id_organizaciones}
                </p>
              )}
            </div>*/}
            {/* DNI */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="usu_dni">
                DNI <span className="text-red-500">*</span>
              </Label>
              <Input
                id="usu_dni"
                name="usu_dni"
                value={formData.usu_dni}
                onChange={handleChange}
                maxLength={8}
                placeholder="12345678"
              />
              {errors.usu_dni && (
                <p className="text-red-500 text-xs mt-1">{errors.usu_dni}</p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4"></div>

            {/* Nombres */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="usu_nombre">
                Nombres <span className="text-red-500">*</span>
              </Label>
              <Input
                id="usu_nombre"
                name="usu_nombre"
                value={formData.usu_nombre}
                onChange={handleChange}
                placeholder="Juan Carlos"
              />
              {errors.usu_nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.usu_nombre}</p>
              )}
            </div>

            {/* Apellido Paterno */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="usu_apellido_paterno">
                Apellido Paterno <span className="text-red-500">*</span>
              </Label>
              <Input
                id="usu_apellido_paterno"
                name="usu_apellido_paterno"
                value={formData.usu_apellido_paterno}
                onChange={handleChange}
                placeholder="Pérez"
              />
              {errors.usu_apellido_paterno && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.usu_apellido_paterno}
                </p>
              )}
            </div>

            {/* Apellido Materno */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="usu_apellido_materno">Apellido Materno</Label>
              <Input
                id="usu_apellido_materno"
                name="usu_apellido_materno"
                value={formData.usu_apellido_materno}
                onChange={handleChange}
                placeholder="García"
              />
            </div>

            {/* Teléfono */}
            <div className="col-span-12 md:col-span-4">
              <Label htmlFor="usu_numero_tel">Teléfono</Label>
              <Input
                id="usu_numero_tel"
                name="usu_numero_tel"
                value={formData.usu_numero_tel}
                onChange={handleChange}
                placeholder="987654321"
              />
            </div>

            {/* Correo */}
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="usu_correo">
                Correo Electrónico <span className="text-red-500">*</span>
              </Label>
              <Input
                id="usu_correo"
                name="usu_correo"
                type="email"
                value={formData.usu_correo}
                onChange={handleChange}
                placeholder="usuario@ejemplo.com"
              />
              {errors.usu_correo && (
                <p className="text-red-500 text-xs mt-1">{errors.usu_correo}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="usu_contrasenia">
                Contraseña <span className="text-red-500">*</span>
              </Label>
              <Input
                id="usu_contrasenia"
                name="usu_contrasenia"
                type="password"
                value={formData.usu_contrasenia}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errors.usu_contrasenia && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.usu_contrasenia}
                </p>
              )}
            </div>

            {/* Vigencia */}
            <div className="col-span-12 md:col-span-3">
              <Label htmlFor="usu_vigencia">Vigencia</Label>
              <select
                id="usu_vigencia"
                name="usu_vigencia"
                value={formData.usu_vigencia}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              >
                <option value="SI">Activo (SI)</option>
                <option value="NO">Inactivo (NO)</option>
              </select>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
