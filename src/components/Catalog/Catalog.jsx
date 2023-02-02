import style from './style.module.css'

export function Catalog({ products }) {

    return (
        products.products.map(product => {
            return (
                <div className={style.card}>
                    <div className={style.picture}>
                        <img
                            alt={product.name}
                            src={product.pictures} />
                    </div>
                    <div className={style.description}>

                        {product.discount ? (
                            <div className={style.discount}>
                                -
                                {product.discount}
                                %
                            </div>
                        ) : (
                            ''
                        )}
                        <h3>{product.price} ₽</h3>
                        <p>{product.name}</p>
                        <button className={style.btn}>В корзину</button>
                    </div>
                </div>
            )
        })
    )
}



{/* // <Space direction='horizontal' align='center' wrap>
        //     {products.products.map(product => {
        //         return <Card
        //             className={style.card}
        //             cover={
        //                 <img
        //                     alt={product.name}
        //                     src={product.pictures}
        //                 />
        //             }>
        //             <Meta
        //                 className={style.description}
        //                 title={product.name}
        //                 description={product.description}
        //             />
        //         </Card>
        //     })}
        // </Space> */}
    // )
    //                 }