import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

const ProductManagement = () => {
  return (
    <div className='flex min-h-screen'>
      <SideBar />
      <div className='flex flex-col flex-grow'>
        <Header title='ProductManagement'/>
        <main className='flex-grow   bg-gray-100'>
        </main>
        <Footer />
      </div>
    </div>
  )
}
 export default ProductManagement;