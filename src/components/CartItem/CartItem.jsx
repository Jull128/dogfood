import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, changeStatusIsChecked, getCartSelector, countIncrement, countDecrement } from "../../redux/slices/cartSlice";
import style from './style.module.css'
import trash from './trash.png'
import favorite from './favorite.png'
import { addFavoriteProduct, deleteFavoriteProduct, getFavoriteSelector } from "../../redux/slices/favoriteSlice";


export function CartItem({
    id, name, pictures, price, discount, stock
}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(getCartSelector);
    const favorite = useSelector(getFavoriteSelector);
    function showProductHandler(event) {
        if (
            !event.target.closest('button') && !event.target.closest('i')
        ) {
            navigate(`/products/${id}`);
        }
    }

    let count = 0;
    let isChecked = false;
    const currentProduct = cart.find((product) => product.id === id);
    if (currentProduct) {
        count = currentProduct.count;
        isChecked = currentProduct.isChecked;
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
    function isCheckedHandler() {
        dispatch(changeStatusIsChecked(id))
    }

    function countIncrementHandler() {
        dispatch(countIncrement({ id }));
    }
    function countDecrementHandler() {
        dispatch(countDecrement(id));
    }

    const discount_price = Math.round(price - price * discount / 100);
    const isInFavorite = (favoriteList) => favorite.find((product) => product.id === favoriteList)
    return (
        <div className={style.card} >
            <div className={style.checkbox}>
                <input onChange={isCheckedHandler} checked={isChecked} className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
            </div>
            <div className={style.picture}>
                <img
                    alt={name}
                    src={pictures} />
            </div>
            <div onClick={showProductHandler} className={style.description}>

                {discount ? (
                    <div >
                        <h3 className={style.old__price}>{(price * count)} ₽</h3>
                        <span className={style.discount}>{(discount_price * count)} ₽</span>
                    </div>

                ) : (
                    <div >
                        <h3 className={style.normal__price}>{(price * count)} ₽</h3>
                    </div>
                )}
                <p>{name}</p>

                <div className={style.quantityWrapper}>
                    <button
                        type="button"
                        disabled={count < 2}
                        onClick={() => countDecrementHandler(id)}
                        className={style.quantityButton}
                    >
                        <i className="fa-solid fa-minus" />
                    </button>
                    {count}
                    <button
                        type="button"
                        disabled={count > stock - 1}
                        onClick={() => countIncrementHandler(id)}
                        className={style.quantityButton}
                    >
                        <i className="fa-solid fa-plus" />
                    </button>
                </div>

            </div>
            <div className={style.button} >
                <span onClick={isInFavorite(id) ? deleteFavoriteHandler : addFavoriteHandler} className={style.btnFavorite}>
                    {isInFavorite(id) ? (
                        <i className="fa-solid fa-heart" style={{ color: "#f8104b" }}></i>
                    ) : (
                        <i className="fa-regular fa-heart"></i>
                    )}</span>
                <span onClick={deleteHandler}><img src={trash} alt='Удалить' /></span>
            </div>
        </div>
    )

}