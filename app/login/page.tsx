'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  //const { setUser } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [LogeoForm, setLogeoForm] = useState({
    nom_usuario: '',
    contrasenia: ''
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'nom_usuario') {
      // Quitar espacios
      let newValue = value.replace(/\s/g, '');

      // Convertir a minúsculas
      newValue = newValue.toLowerCase();

      setLogeoForm((prev) => ({ ...prev, [name]: newValue }));
      return;
    }

    setLogeoForm((prev) => ({ ...prev, [name]: value }));

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
    if (!LogeoForm.nom_usuario)
      newErrors.nom_usuario = 'El Nombre de Usuario es obligatorio';

    if (!LogeoForm.contrasenia)
      newErrors.contrasenia = 'La contraseña es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;
    setIsLoading(true);

    try {
      const { nom_usuario, contrasenia } = LogeoForm;
      const usuarioLogeo: any = {
        nom_usu_sistema: nom_usuario,
        contrasenia: contrasenia
      };
      // const response: any = await AdminUsuarioService.logeo(usuarioLogeo);

      // if (!response.success) {
      //   //handleWarning(response.message);
      //   return;
      // }

      const token = 'token-simulado-123456';

      localStorage.setItem('token', token);
      //localStorage.setItem('user', JSON.stringify(response.data));
      //setUser(response.data);
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      router.push('/dashboard');
      //handleSuccess();
    } catch (err: any) {
      if (err.response?.status === 400) {
        //handleWarning('Usuario o contraseña incorrectos');
      } else {
        //handleWarning('Error del servidor');
      }
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-black text-white flex">
      {/* Panel Izquierdo - Ilustración */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src={'/void-paisaje.png'}
          alt="Ilustración"
          fill
          style={{
            objectFit: 'cover'
          }}
          priority
        />
      </div>

      {/* Panel Derecho - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <Image
              src="/stokontrol-logo.png"
              alt="Stokontrol Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-semibold">Stokontrol</span>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400 mb-8">
            Ingresa tus credenciales para continuar
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div className="space-y-6"> */}
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Nombre de Usuario
              </label>
              <input
                id="nom_usuario"
                name="nom_usuario"
                type="text"
                value={LogeoForm.nom_usuario}
                autoComplete="text"
                onChange={handleChange}
                placeholder="Nombre de Usuario"
                className={`w-full px-4 py-3 bg-black border rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-600
                                ${errors.nom_usuario ? 'border-red-500' : 'border-gray-800'}
                                `}
              />
              <InputError message={errors.nom_usuario} />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="contrasenia"
                  name="contrasenia"
                  type={showPassword ? 'text' : 'password'}
                  value={LogeoForm.contrasenia}
                  autoComplete="current-password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-black border rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-600
                                ${errors.contrasenia ? 'border-red-500' : 'border-gray-800'}
                                `}
                />
                {/* Botón ojo */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <InputError message={errors.contrasenia} />
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
            {/* </div> */}
          </form>

          {/* Social Login */}
          <div className="space-y-3"></div>

          {/* Footer */}
          {/*<p className="mt-8 text-center text-sm text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link href="/registrarse" className="text-white hover:underline">
              <button className="text-white hover:underline">Regístrate</button>
            </Link>
          </p>*/}
        </div>
      </div>
    </div>
  );
}
