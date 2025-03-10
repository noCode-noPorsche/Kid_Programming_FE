import React from 'react'
import { Layout, Dropdown, Avatar, Badge } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { HomeOutlined, LogoutOutlined, DownOutlined, BellOutlined, UserOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import Footer from '../components/Footer'
import { useAuth } from '../../contexts/AuthContext'

const AdminLayout: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content className='flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
          <header className='bg-white mb-6 rounded-xl border border-gray-200 p-4 shadow-xl transition-all duration-300 hover:shadow-2xl'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-6'>
                <div className='relative'>
                  <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-3xl'>Kid Programming</h1>
                  <div className='absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='text-gray-700'>
                    <h2 className='text-xl font-medium'>Welcome, <span className='font-bold text-indigo-700'>{user?.role || 'Admin'}</span></h2>
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-4'>
                <Badge count={5} size="small">
                  <button className='rounded-full bg-gray-100 p-2 text-gray-600 transition-all hover:bg-indigo-100 hover:text-indigo-600'>
                    <BellOutlined style={{ fontSize: '18px' }} />
                  </button>
                </Badge>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'profile',
                        label: (
                          <Link to='/admin/admin-info'>
                            <div className='p-3'>
                              <div className='mb-2 flex items-center space-x-3'>
                                <Avatar 
                                  size={48}
                                  src={user?.avatarUrl || undefined}
                                  icon={!user?.avatarUrl && <UserOutlined />}
                                  style={{ 
                                    backgroundColor: !user?.avatarUrl ? '#1890ff' : undefined,
                                    border: '2px solid #e6f7ff'
                                  }}
                                />
                                <div>
                                  <div className='font-semibold text-gray-800'>{user?.fullName || 'Admin'}</div>
                                  <div className='text-sm text-gray-500'>{user?.email}</div>
                                </div>
                              </div>
                              <div className='mt-2 border-t pt-2' />
                            </div>
                          </Link>
                        )
                      },
                      {
                        key: 'home',
                        icon: <HomeOutlined />,
                        label: 'Home',
                        onClick: () => navigate('/')
                      },
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: 'Logout',
                        onClick: handleLogout
                      }
                    ]
                  }}
                  placement='bottomRight'
                  arrow
                >
                  <button className='flex items-center space-x-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white transition-all hover:shadow-lg hover:from-indigo-700 hover:to-purple-700'>
                    <span>Account</span>
                    <DownOutlined />
                  </button>
                </Dropdown>
              </div>
            </div>
          </header>

          <section className='rounded-xl bg-white p-6 shadow-lg'>
            <Outlet />
          </section>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  )
}

export default AdminLayout
