import { useNavigate, Outlet } from 'react-router-dom';
import style from './style.module.css';
import { AuthForm } from './components/AuthForm/AuthForm';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useEffect, useState } from 'react';



function App() {

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuth(true)
      navigate('products')
    }
  }, [])

  const path = window.location.pathname

  // const onFinish = async () => {
  //   // const res = await api.auth(values);
  //   // const responce = await res.json();

  //   setIsAuth(true)
  //   localStorage.setItem('token', responce.token)
  //   navigate('products')
  // }

  return (
    <Layout className={style.layout}>
      <Header />

      <Content >
        <Outlet />

        {path === '/' && !isAuth && <AuthForm />}
      </Content>

      <Footer />
    </Layout>
  );
}

export default App;
