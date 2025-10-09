import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import { USER_ROLES } from '../../lib/supabaseClient'

const RegisterForm = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const roleOptions = [
    { value: USER_ROLES.ADMIN, label: 'Admin' },
    { value: USER_ROLES.BURSAR, label: 'Bursar' },
    { value: USER_ROLES.TEACHER, label: 'Registrar (Teacher)' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.role) newErrors.role = 'Role is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    const { success, error } = await signUp(formData.email, formData.password, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      role: formData.role
    })
    setIsLoading(false)
    if (success) {
      navigate('/dashboard', { replace: true })
    } else {
      setErrors(prev => ({ ...prev, general: error }))
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
        <p className="text-sm text-gray-600">Register with a role to continue</p>
      </div>

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            leftIcon={<User className="w-5 h-5 text-gray-400" />}
            placeholder="Enter first name"
            required
          />
          <Input
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            leftIcon={<User className="w-5 h-5 text-gray-400" />}
            placeholder="Enter last name"
            required
          />
        </div>

        <Input
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Phone number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          leftIcon={<Phone className="w-5 h-5 text-gray-400" />}
          placeholder="Optional"
        />

        <Select
          label="Role"
          value={formData.role}
          onChange={(e) => handleChange({ target: { name: 'role', value: e.target.value } })}
          options={roleOptions}
          placeholder="Select a role"
          error={errors.role}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
          placeholder="Create a password"
          required
        />

        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
          placeholder="Confirm password"
          required
        />

        <Button type="submit" variant="primary" size="lg" loading={isLoading} className="w-full">
          Create account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm


