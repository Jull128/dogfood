import style from './style.module.css'

export function Catalog({ products }) {


    return (
        products.products.map(product => {
            const discount_price = Math.round(product.price - product.price * product.discount / 100);
            return (
                <div className={style.card}>
                    <div className={style.picture}>
                        <img
                            alt={product.name}
                            src={product.pictures} />
                    </div>
                    <div className={style.description}>

                        {product.discount ? (
                            <div >
                                <h3 className={style.old__price}>{product.price} ₽</h3>
                                <span className={style.discount}>{discount_price} ₽</span>
                            </div>

                        ) : (
                            <div >
                                <h3 className={style.normal__price}>{product.price} ₽</h3>
                            </div>
                        )}
                        <p>{product.name}</p>
                        <button className={style.btn}>В корзину</button>
                    </div>
                </div>
            )
        })
    )
}

