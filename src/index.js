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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

