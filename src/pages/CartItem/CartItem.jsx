import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, changeStatusIsChecked, getCartSelector } from "../../redux/slices/cartSlice";
import style from './style.module.css'
import trash from './trash.png'
import favorite from './favorite.png'


export function CartItem({
    id, name, pictures, price, discount
}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(getCartSelector);

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

    function isCheckedHandler() {
        dispatch(changeStatusIsChecked(id))
    }

    const discount_price = Math.round(price - price * discount / 100);

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
                        <h3 className={style.old__price}>{price} ₽</h3>
                        <span className={style.discount}>{discount_price} ₽</span>
                    </div>

                ) : (
                    <div >
                        <h3 className={style.normal__price}>{price} ₽</h3>
                    </div>
                )}
                <p>{name}</p>
            </div>
            <div className={style.button} >
                <span onClick={deleteHandler}><img src={favorite} /></span>
                <span onClick={deleteHandler}><img src={trash} /></span>
            </div>
        </div>
    )

}