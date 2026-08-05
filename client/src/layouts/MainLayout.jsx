import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const MainLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: '12px',
          background: '#2a2622',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'Figtree, sans-serif',
        },
      }}
    />
  </div>
);
