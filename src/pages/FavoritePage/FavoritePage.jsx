import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../api/api"
import { getFavoriteSelector } from "../../redux/slices/favoriteSlice"
import { getTokenSelector } from "../../redux/slices/tokenSlice"
import { ProductItem } from "../ProductItem/ProductItem"
import style from './style.module.css'

export function FavoritePage() {
    const token = useSelector(getTokenSelector);
    const favorite = useSelector(getFavoriteSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/products');
        }
    }, [token, navigate]);

    const {
        data: products,
    } = useQuery({
        queryKey: ['favorite', favorite],
        queryFn: () => api.getProductsByIds(favorite.map((product) => product.id), token),
        keepPreviousData: true,
    })

    if (products?.length >= 1) {
        return (
            <section className={style.favorites}>
                <div className={style.favorites__title}>Избранное</div>
                <div className={style.favorites__content}>
                    {products?.map((product) => (
                        <ProductItem
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
                    )}
                </div>
            </section>
        )
    }
    return (
        <section className={style.favorites}>
            <div className={style.favorites__auth}>
                <p>У вас нет избранных товаров</p>
                <p><Link to="/products">Каталог</Link></p>
            </div>
        </section>
    )
}
