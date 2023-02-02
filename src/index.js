import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductPage } from './pages/Products/Products';
import { RegForm } from './components/RegForm/RegForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthForm } from './components/AuthForm/AuthForm';
import { User } from './pages/User/User';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/signup',
        element: <RegForm />,
      },
      {
        path: '/products',
        element: <ProductPage />
      },
      {
        path: '/users/me',
        element: <User />
      },

    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

