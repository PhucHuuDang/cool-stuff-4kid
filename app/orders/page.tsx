import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

const Orders = () => {
  return (
    <div className='flex min-h-screen'>
      <SideBar />
      <div className='flex flex-col flex-grow'>
        <Header title='Orders'/>
        <main className='flex-grow   bg-gray-100'>
        </main>
        <Footer />
      </div>
    </div>
  )
}
 export default Orders;