
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { clearToken, getTokenSelector } from '../../redux/slices/tokenSlice';
import { Search } from '../search/Search';
import style from './style.module.css';
import dog from './dog.svg';
import exit from './exit.svg';
import catalog from './catalog.svg';

export function Header() {
    const token = useSelector(getTokenSelector);
    const dispatch = useDispatch()

    function logoutHandler() {
        dispatch((clearToken()))
    }

    return (
        <ul className={style.header}>
            <li>
                <NavLink to='products'><img alt='Каталог' className={style.link__logo} src={catalog} /></NavLink>
            </li>
            <li className={style.search} >
                <Search />
            </li>
            <li>
                <NavLink to='users/me'><img alt='Личный кабинет' className={style.link__logo} src={dog} /></NavLink>
            </li>

            {token && <li onClick={logoutHandler}><Link to="/"><img alt='Выход' className={style.link__logo} src={exit} /></Link></li>}
        </ul>
    )
}

