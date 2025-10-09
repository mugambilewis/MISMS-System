import React from 'react'
import Card from '../../components/common/Card'

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">System Settings</h1>
        <p className="text-secondary-600 mt-1">Configure system preferences and settings</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">System Configuration</h3>
          <p className="text-secondary-600">System settings and configuration options will be implemented here</p>
        </div>
      </Card>
    </div>
  )
}

export default Settings

