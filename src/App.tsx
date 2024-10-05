import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TabNavigation from './components/TabNavigation'
import TabContent from './components/TabContent'
import { Menu } from 'lucide-react'

export type Tab = {
  id: string;
  title: string;
  path: string;
}

function AppContent() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'dashboard', title: 'Dashboard', path: '/' }
  ])
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const addTab = (newTab: Tab) => {
    if (!tabs.some(tab => tab.id === newTab.id)) {
      setTabs([...tabs, newTab])
    }
    setActiveTab(newTab.id)
    navigate(newTab.path)
    setIsSidebarOpen(false)
  }

  const removeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId)
    setTabs(newTabs)
    if (activeTab === tabId) {
      const lastTab = newTabs[newTabs.length - 1]
      setActiveTab(lastTab?.id || '')
      navigate(lastTab?.path || '/')
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar addTab={addTab} isOpen={isSidebarOpen} ref={sidebarRef} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b flex items-center z-10 relative">
          <button
            ref={menuButtonRef}
            onClick={toggleSidebar}
            className="p-4 focus:outline-none focus:bg-gray-100 md:hidden"
          >
            <Menu size={24} />
          </button>
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(tabId) => {
              setActiveTab(tabId)
              const tab = tabs.find(t => t.id === tabId)
              if (tab) navigate(tab.path)
            }}
            removeTab={removeTab}
          />
        </div>
        <TabContent tabs={tabs} activeTab={activeTab} />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App