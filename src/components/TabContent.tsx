import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Settings from '../pages/Settings'
import { Tab } from '../App'

interface TabContentProps {
  tabs: Tab[];
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ tabs, activeTab }) => {
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default TabContent