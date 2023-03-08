import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { api } from "../../api/api"
import { getCartSelector } from "../../redux/slices/cartSlice"
import { getTokenSelector } from "../../redux/slices/tokenSlice"
import { CartItem } from "../CartItem/CartItem"
import style from './style.module.css'

export function CartPage() {
    const token = useSelector(getTokenSelector);
    const cart = useSelector(getCartSelector);

    console.log(cart);

    const {
        data: products,
    } = useQuery({
        queryKey: ['cart'],
        queryFn: () => api.getProductsByIds(cart.map((product) => product.id), token),
        enabled: !!(token),
    })
    console.log(products);

    if (!token) {
        return (
            <p>Вы не авторизованы</p>
        )
    }
    if (cart.length === 0) {
        return (
            <p>Корзина пуста</p>
        )
    }

    return (products?.map(product => {

        return (
            <div className={(cart.length !== 0) && style.products}>
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
            </div>
        )
    }
    )

    )

}