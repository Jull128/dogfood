import { NavLink } from 'react-router-dom';
import style from './style.module.css'

export function Header() {

    return (
        <ul className={style.header}>
            <li>
                <NavLink className={style.link} to='products'>Продукты</NavLink>
            </li>
            <li>
                <NavLink className={style.link} to='users'>Пользователи</NavLink>
            </li>
            <li>
                <NavLink className={style.link} to='signup'>Регистрация</NavLink>
            </li>
            <li>
                <NavLink className={style.link} to='users/me'>Аккаунт</NavLink>
            </li>
        </ul>
    )
}

