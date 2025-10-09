import React from 'react'
import Card from '../../components/common/Card'

const StaffList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Staff Management</h1>
        <p className="text-secondary-600 mt-1">Manage staff records and information</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Staff List</h3>
          <p className="text-secondary-600">Staff management features will be implemented here</p>
        </div>
      </Card>
    </div>
  )
}

export default StaffList

