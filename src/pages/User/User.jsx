import { useEffect, useState } from "react";
import { api } from "../../api/api";
import style from './style.module.css'


export function User() {

  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const res = await api.me(token);
      const responce = await res.json()

      setUser(responce)
    }

    fetchData()
  }, [])


  return (
    <div className={style.container}>
      <h2>Личный кабинет</h2>
      <div className={style.block}>
        <div className={style.avatar}><img alt="" src={user.avatar} /></div>
        <div className={style.description}>
          <p>
            Имя Фамилия :
            <span> {user.name}</span>
          </p>
          <p>
            Ник :
            <span> {user.about}</span>
          </p>
          <p>
            Группа :
            <span> {user.group}</span>
          </p>
          <p>
            E-mail :
            <span> {user.email}</span>
          </p>
        </div>

      </div>

    </div>
  )
}