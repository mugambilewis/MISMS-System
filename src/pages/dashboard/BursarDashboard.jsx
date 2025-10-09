import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import { bursarApi, authApi, dashboardService } from '../../lib/api'

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
  </div>
)

const BursarDashboard = () => {
  const [overview, setOverview] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showReauth, setShowReauth] = useState(false)
  const [password, setPassword] = useState('')
  const [paymentForm, setPaymentForm] = useState({ regNo: '', amount: '', note: '' })

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [ov, list] = await Promise.all([
          dashboardService.getBursarOverview(),
          bursarApi.getPayments()
        ])
        if (!mounted) return
        setOverview(ov)
        setPayments(list.payments || list)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const submitPayment = async (e) => {
    e.preventDefault()
    setShowReauth(true)
  }

  const confirmReauth = async () => {
    try {
      await authApi.reauth(password)
      await bursarApi.createPayment(paymentForm)
      setShowReauth(false)
      setPassword('')
      setPaymentForm({ regNo: '', amount: '', note: '' })
      const list = await bursarApi.getPayments()
      setPayments(list.payments || list)
    } catch (e) {
      alert(e.message)
    }
  }

  if (loading) return (<div className="min-h-[300px] flex items-center justify-center"><LoadingSpinner size="lg" /></div>)
  if (error) return (<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>)

  const { totalCollected, outstandingBalances, pendingStudents, updatesThisWeek } = overview || {}

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Bursar 👋</h1>
        </div>
        <Button onClick={() => setShowAdd(true)}>Add Payment</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Fees Collected" value={totalCollected ?? '—'} />
        <Stat title="Outstanding Balances" value={outstandingBalances ?? '—'} />
        <Stat title="Students with Pending" value={pendingStudents ?? '—'} />
        <Stat title="Payment Updates This Week" value={updatesThisWeek ?? '—'} />
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">Student Name</th>
                <th className="py-2">Reg No</th>
                <th className="py-2">Amount Paid</th>
                <th className="py-2">Balance</th>
                <th className="py-2">Last Payment</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-2">{p.studentName}</td>
                  <td className="py-2">{p.regNo}</td>
                  <td className="py-2">{p.amountPaid}</td>
                  <td className="py-2">{p.balance}</td>
                  <td className="py-2">{p.lastPaymentDate && new Date(p.lastPaymentDate).toLocaleDateString()}</td>
                  <td className="py-2">{p.status}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-500 py-6">No payments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAdd && (
        <Modal onClose={()=>setShowAdd(false)} title="Record Payment">
          <form className="space-y-4" onSubmit={submitPayment}>
            <Input label="Reg No" value={paymentForm.regNo} onChange={(e)=>setPaymentForm({...paymentForm, regNo:e.target.value})} required />
            <Input label="Amount" type="number" value={paymentForm.amount} onChange={(e)=>setPaymentForm({...paymentForm, amount:e.target.value})} required />
            <Input label="Note" value={paymentForm.note} onChange={(e)=>setPaymentForm({...paymentForm, note:e.target.value})} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={()=>setShowAdd(false)}>Cancel</Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reauth Modal */}
      {showReauth && (
        <Modal onClose={()=>setShowReauth(false)} title="Confirm your password">
          <p className="text-sm text-gray-600 mb-3">Enter your password to confirm this payment.</p>
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

export default BursarDashboard


