'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { AngryIcon, AnnoyedIcon, SmileIcon } from 'lucide-react';
import { feedbackData } from './component/feedbackdata'; 
import { RateFilter } from './component/ratefilter'; 

interface FeedbackData {
  Username: string;
  Comments: string;
  Rate: number;
  Time: string;
}

const Feedback: React.FC = () => {
  const [selectedRate, setSelectedRate] = useState<string>('All');
  const [filteredData, setFilteredData] = useState<FeedbackData[]>(feedbackData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(8);

  useEffect(() => {
    const filterData = (rate: string) => {
      if (rate === 'All') {
        setFilteredData(feedbackData);
      } else {
        setFilteredData(feedbackData.filter(feedback => feedback.Rate.toString() === rate));
      }
    };

    filterData(selectedRate);
    setCurrentPage(1); 
  }, [selectedRate]);

  const handleRateChange = (event) => {
    setSelectedRate(event.target.value);
  };

  const mapRateToIcon = (rate: number) => {
    switch(rate) {
      case 3:
        return <SmileIcon className='text-orange-400'/>;
      case 2:
        return <AnnoyedIcon className='text-green-400'/>;
      case 1:
        return <AngryIcon className='text-red-400'/>;
      default:
        return null;
    }
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex min-h-screen overflow-hidden'>
      <SideBar />
      <div className='flex flex-col flex-grow'>
        <Header title='Feedback'/>
        <main className='flex-grow bg-gray-100 p-3 overflow-auto mt-16 ml-64'>
          
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-pink-400'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-[180px] font-semibold'>Username</th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider font-semibold w-[400px]'>Comments</th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider flex items-center font-semibold'>
                  <RateFilter selectedRate={selectedRate} handleRateChange={handleRateChange} />
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider font-semibold'>Time</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentData.map((feedback, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap'>{feedback.Username}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{feedback.Comments}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{mapRateToIcon(feedback.Rate)}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{feedback.Time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-center items-center mt-4'>
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className='px-4 py-2 bg-pink-400 text-white rounded-md disabled:opacity-50'>Previous</button>
            <span className='mx-4'>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='px-4 py-2 bg-pink-400 text-white rounded-md disabled:opacity-50'>Next</button>
          </div>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default Feedback;
