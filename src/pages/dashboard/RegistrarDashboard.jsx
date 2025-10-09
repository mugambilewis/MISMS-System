import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../components/common/Button'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Select from '../../components/common/Select'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import { registrarApi, authApi, dashboardService } from '../../lib/api'

const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
  </div>
)

const RegistrarDashboard = () => {
  const [overview, setOverview] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showReauth, setShowReauth] = useState(false)
  const [pendingStudent, setPendingStudent] = useState(null)
  const [password, setPassword] = useState('')

  const [form, setForm] = useState({ name: '', regNo: '', phone: '', parentPhone: '', intakeName: '', intakeYear: '' })

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [ov, list] = await Promise.all([
          dashboardService.getRegistrarOverview(),
          registrarApi.listStudentsByIntake()
        ])
        if (!mounted) return
        setOverview(ov)
        setStudents(list.students || list)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    if (!filter) return students
    return students.filter(s => (s.intakeName || s.intake)?.toLowerCase() === filter.toLowerCase())
  }, [students, filter])

  const openAdd = () => setShowAdd(true)
  const closeAdd = () => setShowAdd(false)

  const submitAdd = async (e) => {
    e.preventDefault()
    setPendingStudent({ ...form })
    setShowReauth(true)
  }

  const confirmReauth = async () => {
    try {
      await authApi.reauth(password)
      await registrarApi.createStudent(pendingStudent)
      setShowReauth(false)
      setPassword('')
      setPendingStudent(null)
      // refresh
      const list = await registrarApi.listStudentsByIntake()
      setStudents(list.students || list)
    } catch (e) {
      alert(e.message)
    }
  }

  if (loading) return (<div className="min-h-[300px] flex items-center justify-center"><LoadingSpinner size="lg" /></div>)
  if (error) return (<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>)

  const { newAdmissions, totalStudents, pendingResults, upcomingIntakes } = overview || {}

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Registrar 👋</h1>
        </div>
        <Button onClick={openAdd}>Add Student</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="New Admissions (week)" value={newAdmissions ?? '—'} />
        <SummaryCard title="Total Registered Students" value={totalStudents ?? '—'} />
        <SummaryCard title="Pending Results Updates" value={pendingResults ?? '—'} />
        <SummaryCard title="Upcoming Intakes" value={upcomingIntakes ?? '—'} />
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Students by Intake</h2>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[{ value: '', label: 'All' }, { value: 'January', label: 'January' }, { value: 'May', label: 'May' }, { value: 'September', label: 'September' }]}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">Name</th>
                <th className="py-2">Reg No</th>
                <th className="py-2">Intake</th>
                <th className="py-2">Year</th>
                <th className="py-2">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-2">{s.name || `${s.first_name || ''} ${s.last_name || ''}`}</td>
                  <td className="py-2">{s.regNo || s.student_id}</td>
                  <td className="py-2">{s.intakeName || s.intake}</td>
                  <td className="py-2">{s.intakeYear || s.year}</td>
                  <td className="py-2">{s.phone}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-500 py-6">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAdd && (
        <Modal onClose={closeAdd} title="Register New Student">
          <form className="space-y-4" onSubmit={submitAdd}>
            <Input label="Full name" name="name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
            <Input label="Registration No" name="regNo" value={form.regNo} onChange={(e)=>setForm({...form, regNo:e.target.value})} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone" name="phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
              <Input label="Parent Phone" name="parentPhone" value={form.parentPhone} onChange={(e)=>setForm({...form, parentPhone:e.target.value})} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Intake" value={form.intakeName} onChange={(e)=>setForm({...form, intakeName:e.target.value})} options={[{value:'January',label:'January'},{value:'May',label:'May'},{value:'September',label:'September'}]} required />
              <Input label="Intake Year" name="intakeYear" value={form.intakeYear} onChange={(e)=>setForm({...form, intakeYear:e.target.value})} required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={closeAdd}>Cancel</Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reauth Modal */}
      {showReauth && (
        <Modal onClose={()=>setShowReauth(false)} title="Confirm your password">
          <p className="text-sm text-gray-600 mb-3">Enter your password to confirm this sensitive action.</p>
          <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={()=>setShowReauth(false)}>Cancel</Button>
            <Button onClick={confirmReauth}>Confirm</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default RegistrarDashboard


