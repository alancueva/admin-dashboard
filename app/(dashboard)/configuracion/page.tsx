'use client';
import React, { useState } from 'react';
import { User, Mail, Key, Bell, Trash2, Upload, Camera, Globe, Github, Twitter, Linkedin } from 'lucide-react';

export default function ProfileSystem() {
    const [activeTab, setActiveTab] = useState('general');
    const [profileData, setProfileData] = useState({
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        username: 'juanperez',
        bio: 'Desarrollador Full Stack apasionado por crear experiencias web increíbles.',
        website: 'https://juanperez.dev',
        location: 'Lima, Perú',
        company: 'Tech Solutions',
        github: 'juanperez',
        twitter: 'juanperez',
        linkedin: 'juanperez'
    });

    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        securityAlerts: true,
        productNews: false,
        weeklyDigest: true
    });

    const handleInputChange = (field: any, value: any) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleNotificationChange = (field: any) => {
        setNotifications((prev:any) => ({ ...prev, [field]: !prev[field] }));
    };

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'account', label: 'Cuenta', icon: Mail },
        { id: 'security', label: 'Seguridad', icon: Key },
        // { id: 'notifications', label: 'Notificaciones', icon: Bell }
    ];

    return (
        <div className="min-h-screen  text-white">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl text-black font-bold mb-2">Configuración</h1>
                    <p className="text-gray-400">Administra tu perfil y preferencias de cuenta</p>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <nav className="space-y-1">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                                ? 'bg-white text-black'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-900'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="bg-gray-400 border border-gray-400 rounded-lg">
                            {/* General Tab */}
                            {activeTab === 'general' && (
                                <div className="p-8">
                                    <h2 className="text-xl font-semibold mb-6">Información General</h2>

                                    {/* Avatar Section */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium mb-3 text-gray-300">Foto de Perfil</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                                                {profileData.name.charAt(0)}
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                                                    <Upload size={16} />
                                                    Subir nueva
                                                </button>
                                                <button className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors border border-gray-800">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Nombre Completo</label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Nombre de Usuario</label>
                                            <input
                                                type="text"
                                                value={profileData.username}
                                                onChange={(e) => handleInputChange('username', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Biografía</label>
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Máximo 160 caracteres</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-300">Ubicación</label>
                                                <input
                                                    type="text"
                                                    value={profileData.location}
                                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-300">Empresa</label>
                                                <input
                                                    type="text"
                                                    value={profileData.company}
                                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Sitio Web</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                <input
                                                    type="url"
                                                    value={profileData.website}
                                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                                    className="w-full pl-11 pr-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="pt-4 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-4 text-gray-300">Redes Sociales</h3>
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input
                                                        type="text"
                                                        value={profileData.github}
                                                        onChange={(e) => handleInputChange('github', e.target.value)}
                                                        placeholder="github.com/"
                                                        className="w-full pl-11 pr-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input
                                                        type="text"
                                                        value={profileData.twitter}
                                                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                                                        placeholder="twitter.com/"
                                                        className="w-full pl-11 pr-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input
                                                        type="text"
                                                        value={profileData.linkedin}
                                                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                                        placeholder="linkedin.com/in/"
                                                        className="w-full pl-11 pr-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                            Cancelar
                                        </button>
                                        <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Account Tab */}
                            {activeTab === 'account' && (
                                <div className="p-8">
                                    <h2 className="text-xl font-semibold mb-6">Configuración de Cuenta</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Tu correo principal para notificaciones y recuperación de cuenta</p>
                                        </div>

                                        <div className="pt-6 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-4 text-gray-300">Preferencias de Idioma</h3>
                                            <select className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors">
                                                <option>Español</option>
                                                <option>English</option>
                                                <option>Português</option>
                                                <option>Français</option>
                                            </select>
                                        </div>

                                        <div className="pt-6 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-4 text-gray-300">Zona Horaria</h3>
                                            <select className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors">
                                                <option>America/Lima (GMT-5)</option>
                                                <option>America/New_York (GMT-5)</option>
                                                <option>Europe/Madrid (GMT+1)</option>
                                                <option>Asia/Tokyo (GMT+9)</option>
                                            </select>
                                        </div>

                                        <div className="pt-6 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-2 text-red-400">Zona de Peligro</h3>
                                            <p className="text-sm text-gray-400 mb-4">Acciones irreversibles en tu cuenta</p>
                                            <div className="space-y-3">
                                                <button className="w-full px-4 py-2.5 bg-red-950 text-red-400 border border-red-900 rounded-lg text-sm font-medium hover:bg-red-900 transition-colors text-left flex items-center justify-between">
                                                    <span>Eliminar mi cuenta</span>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                            Cancelar
                                        </button>
                                        <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="p-8">
                                    <h2 className="text-xl font-semibold mb-6">Seguridad</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Contraseña Actual</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Confirmar Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>

                                        {/* <div className="pt-6 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-4 text-gray-300">Autenticación de Dos Factores</h3>
                                            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium mb-1">2FA no está activada</p>
                                                        <p className="text-xs text-gray-400">Agrega una capa extra de seguridad a tu cuenta</p>
                                                    </div>
                                                    <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                                                        Activar
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <div className="pt-6 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-4 text-gray-300">Sesiones Activas</h3>
                                            <div className="space-y-3">
                                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium mb-1">Chrome en Windows</p>
                                                            <p className="text-xs text-gray-400">Lima, Perú • Sesión actual</p>
                                                        </div>
                                                        <span className="px-2 py-1 bg-green-950 text-green-400 text-xs rounded-full border border-green-900">
                                                            Activa
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium mb-1">Safari en iPhone</p>
                                                            <p className="text-xs text-gray-400">Lima, Perú • Hace 2 días</p>
                                                        </div>
                                                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                                                            Revocar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                            Cancelar
                                        </button>
                                        <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Actualizar Contraseña
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Notifications Tab */}
                            {activeTab === 'notifications' && (
                                <div className="p-8">
                                    <h2 className="text-xl font-semibold mb-6">Notificaciones</h2>

                                    <div className="space-y-6">
                                        <div className="flex items-start justify-between py-4 border-b border-gray-800">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium mb-1">Actualizaciones por Email</h3>
                                                <p className="text-sm text-gray-400">Recibe emails sobre actualizaciones de productos y features</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationChange('emailUpdates')}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.emailUpdates ? 'bg-white' : 'bg-gray-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${notifications.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-start justify-between py-4 border-b border-gray-800">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium mb-1">Alertas de Seguridad</h3>
                                                <p className="text-sm text-gray-400">Notificaciones sobre actividad sospechosa en tu cuenta</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationChange('securityAlerts')}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.securityAlerts ? 'bg-white' : 'bg-gray-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${notifications.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-start justify-between py-4 border-b border-gray-800">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium mb-1">Noticias de Productos</h3>
                                                <p className="text-sm text-gray-400">Información sobre nuevos productos y servicios</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationChange('productNews')}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.productNews ? 'bg-white' : 'bg-gray-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${notifications.productNews ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-start justify-between py-4">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium mb-1">Resumen Semanal</h3>
                                                <p className="text-sm text-gray-400">Recibe un resumen semanal de tu actividad</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationChange('weeklyDigest')}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.weeklyDigest ? 'bg-white' : 'bg-gray-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${notifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="pt-6 border-t border-gray-800">
                                            <h3 className="text-sm font-medium mb-4 text-gray-300">Método de Notificación</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="radio" name="notification-method" defaultChecked className="w-4 h-4" />
                                                    <div>
                                                        <p className="text-sm font-medium">Email y Push</p>
                                                        <p className="text-xs text-gray-400">Recibe notificaciones en ambos canales</p>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="radio" name="notification-method" className="w-4 h-4" />
                                                    <div>
                                                        <p className="text-sm font-medium">Solo Email</p>
                                                        <p className="text-xs text-gray-400">Recibe notificaciones únicamente por email</p>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="radio" name="notification-method" className="w-4 h-4" />
                                                    <div>
                                                        <p className="text-sm font-medium">Solo Push</p>
                                                        <p className="text-xs text-gray-400">Recibe notificaciones únicamente push</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                            Cancelar
                                        </button>
                                        <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Guardar Preferencias
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}