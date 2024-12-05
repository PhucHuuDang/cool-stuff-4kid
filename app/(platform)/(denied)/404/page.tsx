"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-extrabold text-white mb-4 relative">
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ 
              y: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut"
              }
            }}
            className="inline-block"
          >
            4
          </motion.span>
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ 
              y: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.2
              }
            }}
            className="inline-block text-yellow-300"
          >
            0
          </motion.span>
          <motion.span
            animate={{ y: [0, -20, 0] }}
            transition={{ 
              y: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: 0.4
              }
            }}
            className="inline-block"
          >
            4
          </motion.span>
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-2">Oops! Page not found</h2>
          <p className="text-xl text-blue-100 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReturnHome}
          className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Return Home
        </motion.button>
      </motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 'px',
              height: Math.random() * 6 + 'px',
              bottom: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </motion.div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .absolute {
          animation: float infinite linear;
        }
      `}</style>
    </div>
  );
};

export default NotFound;