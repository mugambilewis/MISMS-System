import React from 'react'
import Card from '../../components/common/Card'

const Logs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">System Logs</h1>
        <p className="text-secondary-600 mt-1">View system activity and audit logs</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Activity Logs</h3>
          <p className="text-secondary-600">System logs and audit trail features will be implemented here</p>
        </div>
      </Card>
    </div>
  )
}

export default Logs

