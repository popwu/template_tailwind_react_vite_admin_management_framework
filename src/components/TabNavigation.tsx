import React, { useState, useRef, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Tab } from '../App'

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  removeTab: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, setActiveTab, removeTab }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false);
  };

  const activeTabTitle = tabs.find(tab => tab.id === activeTab)?.title || 'Select Tab';

  return (
    <div className="flex-1 overflow-x-auto relative">
      {/* Desktop view */}
      <div className="hidden md:flex">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-4 py-2 border-r cursor-pointer ${
              activeTab === tab.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <button onClick={() => setActiveTab(tab.id)} className="mr-2">
              {tab.title}
            </button>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border-b"
        >
          <span>{activeTabTitle}</span>
          <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border shadow-lg z-[100] max-h-60 overflow-y-auto">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                  activeTab === tab.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <button onClick={() => handleTabClick(tab.id)} className="flex-grow text-left">
                  {tab.title}
                </button>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                      if (activeTab === tab.id) {
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;