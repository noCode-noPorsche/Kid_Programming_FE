import { useEffect, useState } from 'react'
import http from '../../utils/http'

interface UserProfile {
  id: string
  email: string
  phoneNumber: string | null
  dateOfBirth: string | null
  avatarUrl: string | null
  fullName: string
  parentId: string | null
  role: string
  createdTime: string
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({})

  const fetchProfile = async () => {
    try {
      const res = await http.get('auth/infor')
      console.log('📌 Thông tin user:', res.data)

      if (res.data?.data) {
        setProfile(res.data.data)
        setEditedProfile(res.data.data)
      }
    } catch (error: unknown) {
      console.error('Lỗi khi lấy thông tin user:', error)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const res = await http.put('auth/infor', editedProfile)
      if (res.data?.data) {
        setProfile(res.data.data)
        setIsEditing(false)
      }
    } catch (error: unknown) {
      console.error('Lỗi khi cập nhật thông tin:', error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (!profile) {
    return <div className='text-center py-8'>Đang tải thông tin...</div>
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Thông tin cá nhân</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className='space-x-2'>
              <button
                onClick={handleSaveProfile}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
              >
                Lưu
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedProfile(profile)
                }}
                className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
              >
                Hủy
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className='flex justify-center mb-6'>
          <div className='relative'>
            <img
              src={profile.avatarUrl || '/default-avatar.png'}
              alt='Avatar'
              className='w-32 h-32 rounded-full object-cover border-4 border-gray-200'
            />
            {isEditing && (
              <button className='absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600'>
                <span role='img' aria-label='edit'>
                  📷
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Thông tin */}
        <div className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Họ và tên</label>
              {isEditing ? (
                <input
                  type='text'
                  value={editedProfile.fullName || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, fullName: e.target.value })}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                />
              ) : (
                <p className='mt-1 text-gray-900'>{profile.fullName}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <p className='mt-1 text-gray-900'>{profile.email}</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Số điện thoại</label>
              {isEditing ? (
                <input
                  type='tel'
                  value={editedProfile.phoneNumber || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phoneNumber: e.target.value })}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                />
              ) : (
                <p className='mt-1 text-gray-900'>{profile.phoneNumber || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Ngày sinh</label>
              {isEditing ? (
                <input
                  type='date'
                  value={editedProfile.dateOfBirth?.split('T')[0] || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                />
              ) : (
                <p className='mt-1 text-gray-900'>
                  {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Vai trò</label>
              <p className='mt-1 text-gray-900'>{profile.role}</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Ngày tạo tài khoản</label>
              <p className='mt-1 text-gray-900'>{new Date(profile.createdTime).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
