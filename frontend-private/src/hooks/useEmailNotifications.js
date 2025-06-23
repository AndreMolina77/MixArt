// src/hooks/useEmailNotifications.js
import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { toast } from 'react-hot-toast'

export const useEmailNotifications = () => {
  const { user, API } = useAuth()
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [loading, setLoading] = useState(false)

  // Cargar estado inicial
  useEffect(() => {
    const loadEmailPreference = async () => {
      try {
        setLoading(true)
        // Para admin, usar endpoint especial
        if (user?.userType === 'admin') {
          const response = await fetch(`${API}/admin/profile/data`, {
            credentials: 'include'
          })
          if (response.ok) {
            const data = await response.json()
            setEmailNotifications(data.emailNotifications || false)
          }
        } else {
          // Para otros usuarios, usar su endpoint correspondiente
          const endpoint = user?.userType === 'customer' ? 'customers' : 'employees'
          const response = await fetch(`${API}/${endpoint}/${user.id}`, {
            credentials: 'include'
          })
          if (response.ok) {
            const data = await response.json()
            setEmailNotifications(data.emailNotifications || false)
          }
        }
      } catch (error) {
        console.error('Error loading email preferences:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id || user?.userType === 'admin') {
      loadEmailPreference()
    }
  }, [user, API])
  const toggleEmailNotifications = async () => {
    try {
      setLoading(true)
      const newValue = !emailNotifications
      let response
      
      if (user?.userType === 'admin') {
        // Para admin
        response = await fetch(`${API}/admin/profile/notifications`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ emailNotifications: newValue })
        })
      } else {
        // Para otros usuarios
        const endpoint = user?.userType === 'customer' ? 'customers' : 'employees'
        response = await fetch(`${API}/${endpoint}/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ emailNotifications: newValue })
        })
      }
      if (!response.ok) {
        throw new Error('Error al actualizar preferencias de email')
      }
      setEmailNotifications(newValue)
      toast.success(
        newValue 
          ? 'Notificaciones por email activadas' 
          : 'Notificaciones por email desactivadas'
      )
      return newValue
    } catch (error) {
      console.error('Error updating email notifications:', error)
      toast.error('Error al actualizar notificaciones por email')
      return emailNotifications // Mantener el valor anterior
    } finally {
      setLoading(false)
    }
  }
  return {
    emailNotifications,
    loading,
    toggleEmailNotifications
  }
}