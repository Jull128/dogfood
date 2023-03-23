import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'
import delivery from './delivery.svg'
import warranty from './warranty.svg'
import { addNewProductInCart, countDecrement, countIncrement, deleteProduct, getCartSelector } from "../../redux/slices/cartSlice";
import { Rating } from "../Rating/Rating";
import { Reviews } from "../Reviews/Reviews";
import { useState } from "react";
import { AddReviewModal } from "./AddReviewModal/AddReviewModal";


export function ProductDetail() {
    const { id } = useParams();
    const token = useSelector(getTokenSelector);
    const dispatch = useDispatch();
    const cart = useSelector(getCartSelector);
    const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

    const openAddReviewModalHandler = () => {
        setIsAddReviewModalOpen(true)
    }

    function addProductInCartHandler() {
        dispatch(addNewProductInCart({ id }))
    }
    function deleteHandler() {
        dispatch(deleteProduct(id))
    }
    function countIncrementHandler() {
        dispatch(countIncrement(id));
    }
    function countDecrementHandler() {
        dispatch(countDecrement(id));
    }

    let count = 0;
    let isChecked = false;
    const currentProduct = cart.find((product) => product.id === id);
    if (currentProduct) {
        count = currentProduct.count;
        isChecked = currentProduct.isChecked;
    }

    const {
        data: product,
    } = useQuery({
        queryKey: ['productById'],
        queryFn: () => api.getProductById(id, token),
        enabled: !!token,
    })
    console.log(product);
    const discount_price = Math.round(product?.price - product?.price * product?.discount / 100);
    const isInCart = (productList) => cart.find((product) => product.id === productList)

    return (

        <div className={style.card} >
            <div className={style.container} >
                <h3 className={style.name}>{product?.name}</h3>
                <Rating />
                <hr />
                <div className={style.product}>
                    <div className={style.discount__picture}>
                        <div className={style.tags}>
                            {product?.discount ? (
                                <span>{product?.discount} %</span>
                            ) : (
                                ''
                            )}

                            {product?.tags.includes('new') ? (
                                <span>Новинка</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <img
                            className={style.product__picture}
                            alt={product?.name}
                            src={product?.pictures} />
                    </div>


                    <div className={style.about}>
                        {product?.discount ? (
                            <div>
                                <span className={style.old__price}>{product?.price} ₽</span>
                                <span className={style.discount}>{discount_price} ₽</span>
                                <span className={style.wight}>{product?.wight}</span>
                            </div>

                        ) : (
                            <div >
                                <span className={style.normal__price}>{product?.price} ₽</span>
                            </div>
                        )}
                        <div className={style.btn__box}>
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
                                    disabled={count > product?.stock - 1}
                                    onClick={() => countIncrementHandler(id)}
                                    className={style.quantityButton}
                                >
                                    <i className="fa-solid fa-plus" />
                                </button>
                            </div>
                            <button onClick={isInCart(id) ? deleteHandler : addProductInCartHandler} className={isInCart(id) ? style.btn__active : style.btn}>
                                {isInCart(id) ? (
                                    <p className={style.btn__text}>В корзине</p>
                                ) : (
                                    <p className={style.btn__text}>В корзину</p>
                                )}
                            </button>
                        </div>
                        <div className={style.delivery}>
                            <img alt='Доставка' src={delivery} />
                            <div>
                                <h3>Доставка по всему Миру!</h3>

                                <p>Доставка курьером — от 399 ₽<br />

                                    Доставка в пункт выдачи — от 199 ₽</p>
                            </div>
                        </div>

                        <div className={style.warranty}>
                            <img alt='Гарантия' src={warranty} />
                            <div>
                                <h3>Гарантия качества</h3>
                                <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={style.description}>
                    <span>Описание</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nam laborum nulla, omnis totam adipisci nesciunt aliquam, eius, sed labore esse! Sit consequatur non libero hic. Blanditiis odit sapiente fugiat?</p>
                </div>
                <hr />
                <div className={style.title__addReview}>
                    <div className={style.reviews}>Отзывы и вопросы о товаре</div>
                    <button className={style.btn__addReview} onClick={openAddReviewModalHandler} type='button'>Добавить отзыв</button>
                </div>
                <div><Reviews /></div>
                <AddReviewModal
                    isAddReviewModalOpen={isAddReviewModalOpen}
                    setIsAddReviewModalOpen={setIsAddReviewModalOpen}
                />
            </div>
        </div>
    )

}