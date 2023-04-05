import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductPage } from './pages/Products/Products';
import { RegForm } from './components/RegForm/RegForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { User } from './pages/User/User';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ProductDetail } from './components/ProductDetail/ProductDetail'
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage'
import { Main } from './components/Main/Main';
import { AuthForm } from './components/AuthForm/AuthForm';

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
        path: '/signin',
        element: <AuthForm />,
      },
      { index: true, element: <Main /> },
      {
        path: '/products',
        element: <ProductPage />
      },
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: '/users/me',
        element: <User />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/favorite',
        element: <FavoritePage />
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

