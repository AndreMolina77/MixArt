import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
  es: {
    // Settings page específico
    settings: 'Configuración',
    profile: 'Perfil',
    security: 'Seguridad', 
    preferences: 'Preferencias',
    personalizeProfile: 'Personaliza tu perfil y preferencias',
    profileInformation: 'Información del Perfil',
    clickCameraIcon: 'Haz clic en el ícono de cámara para cambiar tu foto',
    name: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    phone: 'Teléfono',
    yourName: 'Tu nombre',
    yourLastName: 'Tu apellido',
    saving: 'Guardando...',
    saveChanges: 'Guardar Cambios',
    changePassword: 'Cambiar Contraseña',
    passwordRequirements: 'Asegúrate de usar una contraseña segura con al menos 8 caracteres.',
    currentPassword: 'Contraseña Actual',
    newPassword: 'Nueva Contraseña',
    confirmPassword: 'Confirmar Nueva Contraseña',
    yourCurrentPassword: 'Tu contraseña actual',
    newPasswordPlaceholder: 'Nueva contraseña (mín. 8 caracteres)',
    confirmPasswordPlaceholder: 'Confirma tu nueva contraseña',
    changing: 'Cambiando...',
    theme: 'Tema',
    themeDescription: 'Claro u oscuro',
    language: 'Idioma',
    languageDescription: 'Idioma de la interfaz',
    spanish: 'Español',
    english: 'English',
    emailNotifications: 'Notificaciones por Email',
    emailNotificationsOn: 'Recibirás notificaciones por email',
    emailNotificationsOff: 'No recibirás notificaciones por email',
    browserNotifications: 'Notificaciones del Navegador',
    browserNotificationsEnabled: 'Notificaciones activadas',
    browserNotificationsBlocked: 'Notificaciones bloqueadas',
    browserNotificationsDisabled: 'Notificaciones desactivadas',
    testNotification: 'Probar',
    enableNotifications: 'Activar',
    currentStatus: 'Estado Actual',
    dark: 'Oscuro',
    light: 'Claro',
    enabled: 'Activadas',
    disabled: 'Desactivadas',
    tips: 'Tips',
    tip1: 'Las configuraciones se guardan automáticamente',
    tip2: 'Puedes probar las notificaciones con el botón "Probar"',
    tip3: 'El tema se aplica inmediatamente en toda la aplicación',
    tip4: 'El idioma cambia toda la interfaz de usuario'
  },
  en: {
    // Settings page específico
    settings: 'Settings',
    profile: 'Profile',
    security: 'Security',
    preferences: 'Preferences', 
    personalizeProfile: 'Customize your profile and preferences',
    profileInformation: 'Profile Information',
    clickCameraIcon: 'Click the camera icon to change your photo',
    name: 'Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    yourName: 'Your name',
    yourLastName: 'Your last name',
    saving: 'Saving...',
    saveChanges: 'Save Changes',
    changePassword: 'Change Password',
    passwordRequirements: 'Make sure to use a secure password with at least 8 characters.',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    yourCurrentPassword: 'Your current password',
    newPasswordPlaceholder: 'New password (min. 8 characters)',
    confirmPasswordPlaceholder: 'Confirm your new password',
    changing: 'Changing...',
    theme: 'Theme',
    themeDescription: 'Light or dark',
    language: 'Language',
    languageDescription: 'Interface language',
    spanish: 'Spanish',
    english: 'English',
    emailNotifications: 'Email Notifications',
    emailNotificationsOn: 'You will receive email notifications',
    emailNotificationsOff: 'You will not receive email notifications',
    browserNotifications: 'Browser Notifications',
    browserNotificationsEnabled: 'Notifications enabled',
    browserNotificationsBlocked: 'Notifications blocked',
    browserNotificationsDisabled: 'Notifications disabled',
    testNotification: 'Test',
    enableNotifications: 'Enable',
    currentStatus: 'Current Status',
    dark: 'Dark',
    light: 'Light',
    enabled: 'Enabled',
    disabled: 'Disabled',
    tips: 'Tips',
    tip1: 'Settings are saved automatically',
    tip2: 'You can test notifications with the "Test" button',
    tip3: 'Theme is applied immediately throughout the application',
    tip4: 'Language changes the entire user interface'
  }
}
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es'
  })
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])
  const t = (key) => {
    return translations[language][key] || key
  }
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
// Hook personalizado para usar en componentes
export const useTranslation = () => {
  const { t } = useLanguage()
  return { t }
}