import { Outlet, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { AuthForm } from './components/AuthForm/AuthForm';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTokenSelector } from './redux/slices/tokenSlice';


function App() {
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)


  useEffect(() => {
    if (!token) {
      navigate('/products');
    }
  }, [token]);

  const path = window?.location.pathname

  return (
    <Layout className={style.layout}>
      <Header />
      <Content >
        <Outlet />
        {!token && path !== '/signup' && <AuthForm />}
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
