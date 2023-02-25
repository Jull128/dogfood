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

  const path = window.location.pathname

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
