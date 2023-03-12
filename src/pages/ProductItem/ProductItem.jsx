import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProductInCart, deleteProduct, getCartSelector } from "../../redux/slices/cartSlice";
import { getUserSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'

export function ProductItem({
    id, name, pictures, price, discount, tags
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(getUserSelector)
    const cart = useSelector(getCartSelector)

    function addProductInCartHandler() {
        dispatch(addNewProductInCart({ id }))
    }

    function deleteHandler() {
        dispatch(deleteProduct(id))
    }

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
    const isInCart = (productList) => cart.find((product) => product.id === productList)

    return (
        <div onClick={showProductHandler} className={style.card} >
            {tags.includes('new') ? (
                <div className={style.tags}>
                    <span>Новинка</span>
                </div>
            ) : (
                ''
            )}
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
                <button onClick={isInCart(id) ? deleteHandler : addProductInCartHandler} className={isInCart(id) ? style.btn__active : style.btn}>
                    {isInCart(id) ? (
                        <p className={style.btn__text}>В корзине</p>
                    ) : (
                        <p className={style.btn__text}>В корзину</p>
                    )}
                </button>
            </div>
        </div>
    )

}