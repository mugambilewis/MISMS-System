import React from 'react'
import Card from '../../components/common/Card'

const Announcements = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Announcements</h1>
        <p className="text-secondary-600 mt-1">Manage school announcements and communications</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Announcement Management</h3>
          <p className="text-secondary-600">Announcement creation and management features will be implemented here</p>
        </div>
      </Card>
    </div>
  )
}

export default Announcements
