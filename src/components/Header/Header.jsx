
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearToken, getTokenSelector } from '../../redux/slices/tokenSlice';
import style from './style.module.css'

export function Header() {
    const token = useSelector(getTokenSelector);
    const dispatch = useDispatch()

    function logoutHandler() {
        dispatch((clearToken()))
    }

    // const navigate = useNavigate();

    // const handleExit = () => {
    //     deleteToken()
    //     navigate('/')
    //     window.location.reload()
    // }

    return (
        <ul className={style.header}>
            <li>
                <NavLink className={style.link} to='products'>Продукты</NavLink>
            </li>
            {/* <li>
                <NavLink className={style.link} to='signup'>Регистрация</NavLink>
            </li> */}
            <li>
                <NavLink className={style.link} to='users/me'>Аккаунт</NavLink>
            </li>

            {token && <li onClick={logoutHandler}><Link className={style.link} to="/">Выйти</Link></li>}
        </ul>
    )
}

