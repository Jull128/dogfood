import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { api } from "../../api/api"
import { getCartSelector } from "../../redux/slices/cartSlice"
import { getTokenSelector } from "../../redux/slices/tokenSlice"
import { CartItem } from "../CartItem/CartItem"

export function CartPage() {
    const token = useSelector(getTokenSelector);
    const cart = useSelector(getCartSelector);
    const ids = Object.keys(cart)

    console.log({ ids });
    console.log(cart);

    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
    } = useQuery({
        queryKey: ['cart', ids],
        queryFn: () => api.getProductByIds(ids, token),
        enabled: !!(token),
    })


    if (!token) {
        return (
            <p>Вы не авторизованы</p>
        )
    }
    if (ids.length === 0) {
        return (
            <p>Корзина пуста</p>
        )
    }
    if (data.products) {
        return (data.products.map(product => {

            return (
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
            )
        }
        )

        )
    }
}