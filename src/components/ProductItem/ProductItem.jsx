import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProductInCart, deleteProduct, getCartSelector } from "../../redux/slices/cartSlice";
import { addFavoriteProduct, deleteFavoriteProduct, getFavoriteSelector } from "../../redux/slices/favoriteSlice";
import { getUserSelector } from "../../redux/slices/userSlice";
import style from './style.module.css'

export function ProductItem({
    id, name, pictures, price, discount, tags
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(getUserSelector)
    const cart = useSelector(getCartSelector)
    const favorite = useSelector(getFavoriteSelector);

    function addProductInCartHandler() {
        dispatch(addNewProductInCart({ id }))
    }
    function deleteHandler() {
        dispatch(deleteProduct(id))
    }
    function addFavoriteHandler() {
        dispatch(addFavoriteProduct({ id }))
    }
    function deleteFavoriteHandler() {
        dispatch(deleteFavoriteProduct({ id }))
    }

    function showProductHandler(event) {
        if (
            !event.target.closest('button') && !event.target.closest('i')
        ) {
            navigate(`/products/${id}`);
        }
    }

    const discount_price = Math.round(price - price * discount / 100);
    const isInCart = (productList) => cart.find((product) => product.id === productList)
    const isInFavorite = (favoriteList) => favorite.find((product) => product.id === favoriteList)

    return (
        <div onClick={showProductHandler} className={style.card} >
            <div className={style.title_box}>
                {tags?.includes('new') ? (
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

                {discount ? (
                    <div className={style.box__price}>
                        <h3 className={style.old__price}>{price} ₽</h3>
                        <p className={style.discount}>{`${discount_price} ₽`}</p>
                    </div>

                ) : (
                    <div >
                        <h3 className={style.normal__price}>{price} ₽</h3>
                    </div>
                )}
                <p className={style.name}>{name}</p>
            </div>
            <div className={style.description}>

                <div className={style.btn_box}>
                    <button onClick={isInCart(id) ? deleteHandler : addProductInCartHandler} className={isInCart(id) ? style.btn__active : style.btn}>
                        {isInCart(id) ? (
                            <p className={style.btn__text}>В корзине</p>
                        ) : (
                            <p className={style.btn__text}>В корзину</p>
                        )}
                    </button>
                    <button onClick={isInFavorite(id) ? deleteFavoriteHandler : addFavoriteHandler} className={style.btnFavorite}>
                        {isInFavorite(id) ? (
                            <i className="fa-solid fa-heart" style={{ color: "#f8104b" }}></i>
                        ) : (
                            <i className="fa-regular fa-heart"></i>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )

}