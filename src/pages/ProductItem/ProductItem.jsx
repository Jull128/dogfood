import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'

export function ProductItem({
    id, name, pictures, price, discount
}) {

    const navigate = useNavigate()
    const token = useSelector(getUserSelector)

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    function showProductHandler(event) {
        if (
            !event.target.closest('button') && !event.target.closest('i')
        ) {
            navigate(`/products/${id}`);
        }
    }

    const discount_price = Math.round(price - price * discount / 100);

    return (
        <div onClick={showProductHandler} className={style.card} >
            <div className={style.picture}>
                <img
                    alt={name}
                    src={pictures} />
            </div>
            <div className={style.description}>

                {discount ? (
                    <div >
                        <h3 className={style.old__price}>{price} ₽</h3>
                        <span className={style.discount}>{discount_price} ₽</span>
                    </div>

                ) : (
                    <div >
                        <h3 className={style.normal__price}>{price} ₽</h3>
                    </div>
                )}
                <p>{name}</p>
                <button className={style.btn}>В корзину</button>
            </div>
        </div>
    )

}