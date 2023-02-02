import { useNavigate, Navigate, Outlet, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { api } from './api/api';
import { AuthForm } from './components/AuthForm/AuthForm';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';



function App() {

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuth(true)
    }
  }, [])

  const path = window.location.pathname

  const onFinish = async (values) => {
    const res = await api.auth(values);
    const responce = await res.json();

    setIsAuth(true)
    localStorage.setItem('token', responce.token)
    navigate('products')
  }

  return (
    <Layout>
      <Header />

      <Content >
        <Outlet />

        {path == '/' && !isAuth && <AuthForm onFinish={onFinish} />}
      </Content>

      <Footer />
    </Layout>
  );
}

export default App;
