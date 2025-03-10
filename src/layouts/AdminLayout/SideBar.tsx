import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BankOutlined,
  DashboardOutlined,
  SettingOutlined,
  FileTextOutlined,
  BookOutlined,
  AuditOutlined
} from '@ant-design/icons'
import useResponsiveCollapse from '../../hooks/useResponsiveCollapse'

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [autoCollapsed] = useResponsiveCollapse()
  const [selectedKey, setSelectedKey] = useState<string>('1')

  const isCollapsed = collapsed || autoCollapsed

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined className='text-white' />,
      label: 'Dashboard',
      path: '/admin'
    },
    {
      key: '2',
      icon: <FileTextOutlined className='text-white' />,
      label: 'Course Management',
      path: '/admin/course'
    },
    {
      key: '3',
      icon: <BankOutlined className='text-white' />,
      label: 'Payout Management',
      path: '/admin/payout'
    },
    {
      key: '4',
      icon: <AuditOutlined className='text-white' />,
      label: 'Course Log',
      path: '/admin/course-log'
    },
    {
      key: '5',
      icon: <SettingOutlined className='text-white' />,
      label: 'Setting',
      path: '/admin/admin-info'
    }
  ]

  return (
    <nav
      className={`transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-br from-indigo-800 to-purple-900 min-h-screen shadow-2xl relative overflow-hidden`}
    >
      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 z-0'></div>
      <div className='absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 z-0'></div>

      <div className='relative z-10 flex items-center justify-between border-b border-indigo-400/30 p-4 backdrop-blur-sm'>
        {!isCollapsed && (
          <Link to='/' className='group flex items-center space-x-4'>
            <div className='relative'>
              <h1 className='font-bold text-white text-2xl'>Kid Programming</h1>
              <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
            </div>
          </Link>
        )}
        {isCollapsed && (
          <Link to='/' className='group mx-auto'>
            <div className='relative'>
              <h1 className='font-bold text-white text-2xl'>KP</h1>
              <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
            </div>
          </Link>
        )}
      </div>

      <div className='relative z-10 mt-6 flex flex-col space-y-1 px-3'>
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className={`group flex items-center space-x-3 rounded-lg p-3 text-white/90 transition-all duration-300 hover:bg-white/15 hover:text-white hover:shadow-lg ${
              selectedKey === item.key ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : ''
            }`}
            title={isCollapsed ? item.label : ''}
            onClick={() => setSelectedKey(item.key)}
          >
            <span className='flex items-center justify-center w-6 h-6 transition-transform duration-300 group-hover:scale-110'>
              {item.icon}
            </span>
            {!isCollapsed && <span className='font-medium'>{item.label}</span>}
          </Link>
        ))}
      </div>

      <div className='relative z-10 mt-6 flex flex-col space-y-2 px-4'>
        {!autoCollapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className='rounded-full p-2 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-lg'
          >
            {isCollapsed ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            )}
          </button>
        )}
      </div>
    </nav>
  )
}

export default SideBar
