import { Button } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import style from './style.module.css'

export function User() {
    const location = useLocation();
    const { userId } = useParams();

    return (
<div className={stylesUser.container}>
      <div><h2>Личный кабинет</h2></div>
      <div className={style.block}>
        <div className={style.avatar}><img src={user.avatar} alt="" /></div>
        <div>
          <p>
            Фамилия Имя :
            {' '}
            <span>{ user.name}</span>
          </p>
          <p>
            Тип :
            {' '}
            <span>{user.about}</span>
          </p>
          <p>
            группа :
            {' '}
            <span>{user.group}</span>
          </p>
          <p>
            email :
            {' '}
            <span>{user.email}</span>
          </p>
          <button type="button" onClick={() => submit()}>Выйти</button>
        </div>

      </div>
    </div>
    )
} 