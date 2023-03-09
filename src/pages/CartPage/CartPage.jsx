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
    const navigate = useNavigate()

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

    console.log(cart);
    console.log(products);

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

    return (cart.length && products?.map(product => {

        return (
            <div key={product._id} className={(cart.length !== 0) && style.products}>
                <CartItem
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    pictures={product.pictures}
                    wight={product.wight}
                    discount={product.discount}
                    tags={product.tags}
                />
            </div>
        )
    }
    )
    )

}