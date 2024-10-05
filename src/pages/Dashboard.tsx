import React from 'react'
import { BarChart, Users, DollarSign, ShoppingCart } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={<Users size={24} />} title="Total Users" value="1,234" />
        <DashboardCard icon={<ShoppingCart size={24} />} title="Total Orders" value="56" />
        <DashboardCard icon={<DollarSign size={24} />} title="Total Revenue" value="$12,345" />
        <DashboardCard icon={<BarChart size={24} />} title="Conversion Rate" value="2.3%" />
      </div>
    </div>
  )
}

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500">{icon}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="text-gray-600">{title}</div>
    </div>
  )
}

export default Dashboard