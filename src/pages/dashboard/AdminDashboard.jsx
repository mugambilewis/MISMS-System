import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { dashboardService } from '../../lib/api'

const Card = ({ title, value, onClick }) => (
  <button onClick={onClick} className="bg-white rounded-xl p-5 shadow hover:shadow-md transition text-left">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-3xl font-semibold text-gray-900">{value}</div>
  </button>
)

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await dashboardService.getAdminOverview()
        if (mounted) setData(res)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (loading) return (<div className="min-h-[300px] flex items-center justify-center"><LoadingSpinner size="lg" /></div>)
  if (error) return (<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>)

  const { totals = {}, recentActivities = [] } = data || {}

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Administrator 👋</h1>
          <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Students" value={totals.students ?? '—'} onClick={() => navigate('/admin/students')} />
        <Card title="Total Teachers" value={totals.teachers ?? '—'} onClick={() => navigate('/admin/teachers')} />
        <Card title="Total Departments" value={totals.departments ?? '—'} onClick={() => navigate('/admin/departments')} />
        <Card title="Total Intakes" value={totals.intakes ?? '—'} onClick={() => navigate('/admin/intakes')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>Refresh</Button>
          </div>
          <ul className="divide-y">
            {recentActivities.slice(0, 10).map((item, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">{item.message || item.action}</p>
                  <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600">{item.actor || 'system'}</span>
              </li>
            ))}
            {recentActivities.length === 0 && (
              <li className="py-6 text-center text-gray-500 text-sm">No recent activity</li>
            )}
          </ul>
        </div>
        <div className="space-y-4">
          <Card title="Outstanding Fees" value={totals.outstandingFees ?? '—'} onClick={() => navigate('/admin/finance')} />
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Button className="w-full" variant="secondary" onClick={() => navigate('/admin/students')}>Students</Button>
              <Button className="w-full" variant="secondary" onClick={() => navigate('/admin/teachers')}>Teachers</Button>
              <Button className="w-full" variant="secondary" onClick={() => navigate('/admin/departments')}>Departments</Button>
              <Button className="w-full" variant="secondary" onClick={() => navigate('/admin/finance')}>Finance</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


