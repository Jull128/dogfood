import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'


export function ProductDetail() {
    const { id } = useParams();
    const token = useSelector(getTokenSelector);

    const {
        data: product,
    } = useQuery({
        queryKey: ['productById'],
        queryFn: () => api.getProductById(id, token),
        enabled: !!(token),
    })
    const discount_price = Math.round(product?.price - product?.price * product?.discount / 100);
    console.log(product);

    return (
        <div className={style.card} >
            <div className={style.container} >
                <div className={style.product}>
                    {product?.discount ? (

                        <div className={style.discount__picture}>
                            <span>{product?.discount} %</span>
                            <img
                                alt={product?.name}
                                src={product?.pictures} />
                        </div>

                    ) : (
                        <div className={style.nondiscount__picture}>
                            <img
                                alt={product?.name}
                                src={product?.pictures} />
                        </div>
                    )}
                    <div className={style.about}>
                        {product?.discount ? (
                            <div>
                                <span className={style.old__price}>{product?.price} ₽</span>
                                <span className={style.discount}>{discount_price} ₽</span>
                                <span className={style.wight}>{product?.wight}</span>
                            </div>

                        ) : (
                            <div >
                                <h3 className={style.normal__price}>{product?.price} ₽</h3>
                            </div>
                        )}
                        <button className={style.btn}>В корзину</button>
                    </div>

                </div>
                <div className={style.description}>
                    <span>Описание</span>
                    <p>{product?.name}</p>

                </div>
            </div>
        </div>
    )

}