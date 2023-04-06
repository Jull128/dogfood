import { Link } from "react-router-dom";
import style from "./style.module.css"
import { useSelector } from "react-redux";
import { getTokenSelector } from "../../redux/slices/userSlice";

export function Main() {
    const token = useSelector(getTokenSelector);
    return (

        <div className={style.container}>
            Добро пожаловать в интернет-магазин еды для собак
            <b> DogFood</b>
            !
            <div>Приятных покупок!</div>
            {token && <p><Link to="/products">Каталог</Link></p>}
        </div>
    );
}