import { useState } from 'react'

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('creditCard')

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full'>
        <h2 className='text-2xl font-bold text-center mb-6'>Thanh Toán</h2>

        {/* Order Summary */}
        <div className='border p-4 rounded-lg mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Thông Tin Đơn Hàng</h3>
          <div className='flex justify-between text-gray-600'>
            <span>Khóa học: Lập trình Python cơ bản</span>
            <span className='font-semibold text-red-500'>499.000đ</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='border p-4 rounded-lg mb-6'>
          <h3 className='text-lg font-semibold mb-3'>Phương Thức Thanh Toán</h3>
          <div className='space-y-3'>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='payment'
                value='creditCard'
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
                className='form-radio'
              />
              Thẻ Tín Dụng / Ghi Nợ
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='payment'
                value='momo'
                checked={paymentMethod === 'momo'}
                onChange={() => setPaymentMethod('momo')}
                className='form-radio'
              />
              Ví MoMo
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='payment'
                value='bankTransfer'
                checked={paymentMethod === 'bankTransfer'}
                onChange={() => setPaymentMethod('bankTransfer')}
                className='form-radio'
              />
              Chuyển Khoản Ngân Hàng
            </label>
          </div>
        </div>

        {/* Payment Details */}
        {paymentMethod === 'creditCard' && (
          <div className='border p-4 rounded-lg mb-6'>
            <h3 className='text-lg font-semibold mb-3'>Thông Tin Thẻ</h3>
            <input type='text' placeholder='Số thẻ' className='w-full border p-2 rounded mb-2' />
            <div className='flex gap-2'>
              <input type='text' placeholder='MM/YY' className='w-1/2 border p-2 rounded' />
              <input type='text' placeholder='CVV' className='w-1/2 border p-2 rounded' />
            </div>
          </div>
        )}

        {/* Pay Button */}
        <button className='w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold'>Thanh Toán</button>
      </div>
    </div>
  )
}
