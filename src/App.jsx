import './style.css';
import './pages/pages.css';

// routing
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// components pulled from split-up markup
import Navbar from './components/Navbar';
import VideoBanner from './components/VideoBanner';
import Homescreen from './components/Homescreen';
import Footer from './components/Footer';
import TourPackages from './pages/TourPackages';
import TourPackageDetail from './pages/TourPackageDetail';
import HotelsResorts from './pages/HotelsResorts';
import UttarakhandDestination from './pages/UttarakhandDestination';
import DestinationDetail from './pages/DestinationDetail';
import DestinationWedding from './pages/DestinationWedding';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import useScrollReveal from './hooks/useScrollReveal';

function Layout() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
            <>
              <VideoBanner />
              <Homescreen />
            </>
          ),
        },
        { path: '/tour-packages', element: <TourPackages /> },
        { path: '/tour-packages/:id', element: <TourPackageDetail /> },
        { path: '/hotels-resorts', element: <HotelsResorts /> },
        { path: '/uttarakhand-destination', element: <UttarakhandDestination /> },
        { path: '/uttarakhand-destination/:slug', element: <DestinationDetail /> },
        { path: '/destination-wedding', element: <DestinationWedding /> },
        { path: '/gallery', element: <GalleryPage /> },
        { path: '/contact', element: <ContactPage /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
