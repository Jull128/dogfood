import { Link } from "react-router-dom";
import style from "./style.module.css"

export function Main() {
    return (
        <div className={style.container}>
            Добро пожаловать в интернет-магазин еды для собак
            <b> DogFood</b>
            !
            <div>Приятных покупок!</div>
            <p><Link to="/products">Каталог</Link></p>
        </div>
    );
}