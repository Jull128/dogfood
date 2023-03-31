import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);


  return (
    <Layout className={style.layout}>
      <Header />
      <Content >
        <Outlet />
        {!token && location !== '/signup' && <AuthForm />}
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
