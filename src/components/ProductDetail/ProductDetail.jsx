import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'
import delivery from './delivery.svg'
import warranty from './warranty.svg'


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
                                className={style.product__picture}
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
                                <span className={style.normal__price}>{product?.price} ₽</span>
                            </div>
                        )}
                        {/* add count */}
                        <button className={style.btn}>В корзину</button>

                        <div className={style.delivery}>
                            <img src={delivery} />
                            <div>
                                <h3>Доставка по всему Миру!</h3>

                                <p>Доставка курьером — от 399 ₽<br />

                                    Доставка в пункт выдачи — от 199 ₽</p>
                            </div>
                        </div>

                        <div className={style.warranty}>
                            <img src={warranty} />
                            <div>
                                <h3>Гарантия качества</h3>
                                <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={style.description}>
                    <span>Описание</span>
                    <p>{product?.name}</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nam laborum nulla, omnis totam adipisci nesciunt aliquam, eius, sed labore esse! Sit consequatur non libero hic. Blanditiis odit sapiente fugiat?</p>
                </div>
            </div>
        </div>
    )

}