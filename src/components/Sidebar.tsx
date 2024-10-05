import React, { forwardRef } from 'react'
import { Home, Users, Settings } from 'lucide-react'
import { Tab } from '../App'

interface SidebarProps {
  addTab: (tab: Tab) => void;
  isOpen: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ addTab, isOpen }, ref) => {
  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', path: '/', icon: Home },
    { id: 'users', title: 'Users', path: '/users', icon: Users },
    { id: 'settings', title: 'Settings', path: '/settings', icon: Settings },
  ]

  return (
    <div
      ref={ref}
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
    >
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => addTab({ id: item.id, title: item.title, path: item.path })}
            className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <item.icon className="inline-block mr-2" size={20} />
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar