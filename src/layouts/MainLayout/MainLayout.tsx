// import Footer from '../components/Footer'
// import Header from '../../components/Header'

// interface MainLayoutProps {
//   children?: React.ReactNode
// }

// export default function MainLayout({ children }: MainLayoutProps) {
//   return (
//     <div>
//       <Header />
//       {children}
//       <Footer />
//     </div>
//   )
// }

import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
