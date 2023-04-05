import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { getUserSelector } from "../../redux/slices/userSlice";
import style from './style.module.css'


export function User() {

  const navigate = useNavigate()
  const token = useSelector(getUserSelector)

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  const {
    data: user,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => api.me(token),
    enabled: !!(token),
  })

  return (
    <div className={style.container}>
      <h2>Личный кабинет</h2>
      <div className={style.block}>
        <div className={style.avatar}><img alt="" src={token?.avatar} /></div>
        <div className={style.description}>
          <p>
            Имя Фамилия :
            <span> {token?.name}</span>
          </p>
          <p>
            Ник :
            <span> {token?.about}</span>
          </p>
          <p>
            Группа :
            <span> {token?.group}</span>
          </p>
          <p>
            E-mail :
            <span> {token?.email}</span>
          </p>
        </div>

      </div>

    </div>
  )
}