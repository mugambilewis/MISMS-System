import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService, onAuthStateChange } from '../lib/auth'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { session } = await authService.getSession()
        if (session?.user) {
          setUser(session.user)
          await loadUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)
      
      if (session?.user) {
        setUser(session.user)
        await loadUserProfile(session.user.id)
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await authService.getUserProfile(userId)
      if (error) throw error
      setUserProfile(data)
    } catch (error) {
      console.error('Error loading user profile:', error)
      setError(error.message)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await authService.signIn(email, password)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await authService.signUp(email, password, userData)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await authService.signOut()
      if (error) throw error
      setUser(null)
      setUserProfile(null)
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      const { data, error } = await authService.resetPassword(email)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      setError(null)
      const { data, error } = await authService.updatePassword(newPassword)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      const { data, error } = await authService.updateUserProfile(user.id, updates)
      if (error) throw error
      setUserProfile(data)
      return { success: true, data }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    clearError,
    isAuthenticated: !!user,
    isAdmin: userProfile?.role === 'admin',
    isTeacher: userProfile?.role === 'teacher',
    isBursar: userProfile?.role === 'bursar',
    isStudent: userProfile?.role === 'student'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

