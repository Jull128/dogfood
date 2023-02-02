import { NavLink } from 'react-router-dom';
import style from './style.module.css'

export function Footer() {

    return (
        <ul className={style.footer}>
            <li>
                <NavLink className={style.link} to='products'>DogFood.ru</NavLink>
            </li>
        </ul>
    )
}
