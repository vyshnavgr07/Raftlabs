import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TrackOrdersPage } from '../pages/TrackOrdersPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';
import { OrderTrackingPage } from '../pages/OrderTrackingPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'track', element: <TrackOrdersPage /> },
      { path: 'orders/:id/success', element: <OrderSuccessPage /> },
      { path: 'orders/:id', element: <OrderTrackingPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
