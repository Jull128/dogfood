import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/api"
import { getCartSelector } from "../../redux/slices/cartSlice"
import { getTokenSelector } from "../../redux/slices/tokenSlice"
import { CartItem } from "../CartItem/CartItem"
import style from './style.module.css'

export function CartPage() {
    const token = useSelector(getTokenSelector);
    const cart = useSelector(getCartSelector);
    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    const {
        data: products,
    } = useQuery({
        queryKey: ['cart', cart],
        queryFn: () => api.getProductsByIds(cart.map((product) => product.id), token),
        enabled: !!(token),
    })

    const checkedProducts = cart.filter((product) => product.isChecked)

    console.log(cart);
    console.log(checkedProducts);

    if (!token) {
        return (
            <p>Вы не авторизованы</p>
        )
    }
    if (!cart.length) {
        return (
            <p>Корзина пуста</p>
        )
    }

    return (
        <div className={style.container}>
            <div className={(cart.length !== 0) && style.products}>
                {products?.map((product) => (
                    <CartItem
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        pictures={product.pictures}
                        wight={product.wight}
                        discount={product.discount}
                        tags={product.tags}
                    />
                ))}
            </div>

            {checkedProducts.length ? (
                <div className={style.cart}>
                    Ваша корзина
                    1 товар • 60 гр
                    Товары (1)
                    1 049 ₽
                    Скидка

                    Подробнее
                    - 217 ₽
                    Общая стоимость
                    832 ₽
                    При оплате Ozon Картой
                    764 ₽
                </div>

            ) : (
                <div className={style.cart}>
                    Выберите товары, чтобы перейти к оформлению заказа
                </div>
            )
            }
        </div >
    )
}
