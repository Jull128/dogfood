
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { clearToken, getTokenSelector, getUserSelector } from '../../redux/slices/userSlice';
import { Search } from '../Search/Search';
import style from './style.module.css';
import dog from './dog.svg';
import exit from './exit.svg';
import catalog from './catalog.svg';
import cartimg from './cartimg.png';
import favoriteImg from './favorite.png';
import { getCartSelector } from '../../redux/slices/cartSlice';
import { getFavoriteSelector } from '../../redux/slices/favoriteSlice';

export function Header() {
    const token = useSelector(getTokenSelector);
    const dispatch = useDispatch()
    const cart = useSelector(getCartSelector);
    const favorite = useSelector(getFavoriteSelector);
    const totalCount = Object.keys(cart).length;
    const totalFavoriteCount = favorite.reduce((acc, val) => acc + val.count, 0);
    const user = useSelector(getUserSelector)
    const userName = user.name?.replace(/ .*/, '');

    function logoutHandler() {
        dispatch((clearToken()))
    }

    return (
        <ul className={style.header}>
            <li>
                <NavLink to='products'>
                    <img alt='' className={style.link__logo} src={catalog} />
                    <p className={style.text}>Каталог</p>
                </NavLink>
            </li>
            {token &&
                <>
                    <li className={style.search} >
                        <Search />
                    </li>

                    <li>
                        <NavLink to='users/me'>
                            <div className={style.box}>
                                <img alt='' className={style.link__logo} src={dog} />
                                <p className={style.text}>{userName}</p>
                            </div>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to='cart'>
                            <div className={style.box__cart}>
                                <img alt='' className={style.link__logo} src={cartimg} />

                                <div className={style.cart}>{totalCount}</div>
                            </div>
                            <div className={style.text}>Корзина</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='favorite' className={style.favorite}>
                            <div className={style.box__cart}>
                                <img alt='' className={style.link__logo} src={favoriteImg} />
                                <div className={style.cart}>{totalFavoriteCount}</div>
                            </div>
                            <div className={style.text}>Избранное</div>
                        </NavLink>
                    </li>
                </>
            }
            {token && <li onClick={logoutHandler}><Link to="/">
                <div className={style.box}>
                    <img alt='Выход' className={style.link__logo} src={exit} />
                    <p className={style.text}>Выйти</p>
                </div>
            </Link></li>}
        </ul>
    )
}

