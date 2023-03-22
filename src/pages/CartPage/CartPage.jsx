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
    }, [token, navigate]);

    const {
        data: products,
    } = useQuery({
        queryKey: ['cart', cart],
        queryFn: () => api.getProductsByIds(cart.map((product) => product.id), token),
        enabled: !!token,
    })

    const checkedProducts = cart.filter((product) => product.isChecked).filter((cartProduct) => products && products.find((product) => cartProduct.id === product['_id']));
    const totalCount = checkedProducts.reduce((acc, val) => acc + val.count, 0);

    let totalCostWithoutDiscont = 0;
    checkedProducts.map((product) => {
        const checkedProduct = products && products.find((el) => product.id === el['_id']);
        totalCostWithoutDiscont
            += checkedProduct.price
            * product.count;
        return totalCostWithoutDiscont;
    });

    let totalCost = 0;
    checkedProducts.map((product) => {
        const checkedProduct = products && products.find((el) => product.id === el['_id']);
        totalCost
            += checkedProduct.price
            * (1 - checkedProduct.discount / 100)
            * product.count;
        return totalCost;
    });


    let totalDiscount = 0;
    checkedProducts.map((product) => {
        const checkedProduct = products.find((el) => product.id === el['_id']);
        totalDiscount
            += ((checkedProduct.price
                * (1 - checkedProduct.discount / 100)
                * product.count)
                - (checkedProduct.price
                    * product.count)) * (-1);
        return totalDiscount;
    });

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
                        stock={product.stock}
                    />
                ))}
            </div>

            {checkedProducts.length ? (
                <div className={style.cart}>
                    <div className={style.line}>
                        <span className={style.cart__head}>{`Ваша корзина `}</span>
                        <span className={style.cart__content}>
                            {totalCount}
                            {totalCount === 1 ? ' товар' : ''}
                            {totalCount > 1 && totalCount < 5 ? ' товара' : ''}
                            {totalCount > 4 ? ' товаров' : ''}
                        </span>
                    </div>
                    <div className={style.line}>
                        <span className={style.cart__head_two}>{`Товары (${totalCount})`}</span>
                        <span className={style.cart__price}>
                            {`${totalCostWithoutDiscont} ₽`}
                        </span>
                    </div>
                    <div className={style.line}>
                        <span className={style.cart__head_two}>Скидка</span>
                        <span className={style.cart__discount}>
                            {`- ${totalDiscount} ₽`}
                        </span>
                    </div>
                    <hr />
                    <div className={style.line}>
                        <span className={style.cart__head_third}>Общая стоимость</span>
                        <span className={style.cart__total_price}>
                            {`${totalCost} ₽`}
                        </span>
                    </div>
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
