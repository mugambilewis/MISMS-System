import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RoleRedirect = () => {
  const { userProfile, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading) return
    const role = userProfile?.role
    if (!role) return
    if (role === 'admin') navigate('/admin/dashboard', { replace: true, state: { from: location } })
    else if (role === 'teacher') navigate('/registrar/dashboard', { replace: true, state: { from: location } })
    else if (role === 'bursar') navigate('/bursar/dashboard', { replace: true, state: { from: location } })
  }, [userProfile, loading, navigate, location])

  return null
}

export default RoleRedirect


