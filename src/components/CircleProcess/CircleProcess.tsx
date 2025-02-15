interface CircleProcessProps {
  percentage: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
  showArrow?: boolean
}

export default function CircleProcess({ percentage, onClick, showArrow = false }: CircleProcessProps) {
  return (
    <div className='relative w-14 h-14 cursor-pointer' onClick={onClick}>
      <svg className='absolute top-0 left-0 w-full h-full' viewBox='0 0 36 36'>
        <circle className='text-gray-300 stroke-current' strokeWidth='3' fill='transparent' r='16' cx='18' cy='18' />
        <circle
          className='text-gray-500 stroke-current'
          strokeWidth='3'
          fill='transparent'
          r='16'
          cx='18'
          cy='18'
          strokeDasharray='100, 100'
          strokeDashoffset={percentage === 100 ? 0 : 100 - percentage}
          strokeLinecap='round'
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-500'>
        {showArrow ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 10l7-7m0 0l7 7m-7-7v18' />
          </svg>
        ) : (
          `${percentage}%`
        )}
      </div>
    </div>
  )
}
