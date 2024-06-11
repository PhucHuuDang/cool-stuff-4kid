import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { Details } from './component/details';

const Feedback = () => {

  return (
    <div className='flex min-h-screen overflow-hidden'>
      <SideBar />
      <div className='flex flex-col flex-grow'>
        <Header title='Feedback'/>
        <main className='flex-grow bg-gray-100 p-3 overflow-auto mt-16 ml-64'>
          <Details />
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default Feedback;
