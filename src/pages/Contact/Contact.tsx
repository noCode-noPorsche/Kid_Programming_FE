import { useState } from 'react'
// import axios from 'axios'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // try {
    //   const response = await axios.post('http://localhost:5000/send-email', formData)
    //   alert('Message sent successfully!')
    // } catch (error) {
    //   alert('Failed to send message!')
    //   console.error(error)
    // }
  }

  return (
    <div className='container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/* Left Side - Contact Form */}
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Leave A Reply</h2>
        <p className='text-gray-500 mb-4'>Fill-up The Form and Message us of your amazing question</p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              className='border p-2 rounded w-full'
              onChange={handleChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              className='border p-2 rounded w-full'
              onChange={handleChange}
              required
            />
          </div>
          <input
            type='text'
            name='subject'
            placeholder='Select Subject'
            className='border p-2 rounded w-full'
            onChange={handleChange}
            required
          />
          <textarea
            name='message'
            placeholder='Message'
            className='border p-2 rounded w-full h-24'
            onChange={handleChange}
            required
          ></textarea>
          <button type='submit' className='bg-teal-500 text-white p-2 rounded w-full'>
            Submit Message
          </button>
        </form>
      </div>

      {/* Right Side - Office Information */}
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Office Information</h2>
        <p className='text-gray-500 mb-4'>
          Completely recapitalize 24/7 communities via standards compliant metrics whereas.
        </p>
        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold'>📞 Phone Number & Email</h3>
            <p className='text-gray-500'>(+65) - 48596 - 5789</p>
            <p className='text-gray-500'>hello@edcare.com</p>
          </div>
          <div>
            <h3 className='font-semibold'>📍 Our Office Address</h3>
            <p className='text-gray-500'>2690 Hilton Street Victoria Road, New York, Canada</p>
          </div>
          <div>
            <h3 className='font-semibold'>⏰ Official Work Time</h3>
            <p className='text-gray-500'>Monday - Friday: 09:00 - 20:00</p>
            <p className='text-gray-500'>Sunday & Saturday: 10:30 - 22:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
