import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { Details } from './component/details';

const Orders = () => {
  return (
    <div className='flex min-h-screen'>
      <SideBar />
      <div className='flex flex-col flex-grow'>
        <Header title='Orders'/>
        <main className='flex-grow bg-gray-100 p-3 overflow-auto mt-16 ml-64'>
          <Details/>
        </main>
        <Footer />
      </div>
    </div>
  )
}
 export default Orders;