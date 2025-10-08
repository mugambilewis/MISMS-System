import React from 'react'
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp,
  BookOpen,
  MessageSquare
} from 'lucide-react'
import { StatCard } from '../../components/common/Card'

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Total Staff',
      value: '89',
      change: '+3%',
      changeType: 'positive',
      icon: GraduationCap
    },
    {
      title: 'Outstanding Fees',
      value: '₦2.4M',
      change: '-8%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Active Classes',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: BookOpen
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'student_registration',
      message: 'New student John Doe registered',
      time: '2 minutes ago',
      icon: Users
    },
    {
      id: 2,
      type: 'payment_received',
      message: 'Payment of ₦50,000 received from Jane Smith',
      time: '1 hour ago',
      icon: DollarSign
    },
    {
      id: 3,
      type: 'result_uploaded',
      message: 'Mathematics results uploaded for JSS 1A',
      time: '3 hours ago',
      icon: BookOpen
    },
    {
      id: 4,
      type: 'announcement',
      message: 'New announcement published',
      time: '5 hours ago',
      icon: MessageSquare
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-600 mt-1">
          Welcome back! Here's what's happening at your school today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Enrollment Trends
          </h3>
          <div className="h-64 flex items-center justify-center bg-secondary-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
              <p className="text-secondary-500">Chart will be implemented with Recharts</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-secondary-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
            <Users className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Add Student</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
            <GraduationCap className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Add Staff</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
            <BookOpen className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Upload Results</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
            <DollarSign className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Record Payment</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
            <MessageSquare className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Send Message</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
            <TrendingUp className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
