"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            <div className="hidden lg:block w-1/2  relative overflow-hidden">
                <Image src="/void-paisaje.png" alt="Hero Image" layout="fill" objectFit="cover" />
            </div>
            <div className="w-full lg:w-1/2 bg-black flex flex-col justify-center p-8">
                <div className="max-w-md mx-auto w-full ">
                    <h2 className="text-3xl font-light text-white mb-2">Crear tu cuenta</h2>
                    {/* <p className="text-gray-400 text-sm mb-8">
                            Join a network of designers and unlock premium design resources tailored for you.
                        </p> */}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Nombre"
                                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    placeholder="Apellidos"
                                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-300 text-sm mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Ejemplo@gmail.com"
                                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition"
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••••••"
                                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Confirmar contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••••••"
                                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <p className="text-gray-500 text-xs">
                            La contraseña debe tener al menos 8 caracteres, incluyendo un número y un carácter especial.
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-300 hover:bg-green-400 text-black font-medium py-3 rounded-lg transition duration-200"
                        >
                            Crear cuenta
                        </button>

                        {/* Sign In Link */}
                        {/* <p className="text-center text-gray-400 text-sm">
                               ¿No tienes una cuenta?{' '}
                                <a href="#" className="text-white hover:underline">
                                    Sign Up
                                </a>
                            </p> */}

                        {/* Terms */}
                        {/* <p className="text-center text-gray-600 text-xs">
                                By creating an account, you agree to our{' '}
                                <a href="#" className="text-gray-400 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-gray-400 hover:underline">
                                    Privacy Policy
                                </a>
                            </p> */}
                    </form>
                </div>
            </div>

        </div>
    );
}