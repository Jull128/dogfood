import { useNavigate } from 'react-router-dom';
import { ProductItem } from '../../pages/ProductItem/ProductItem';
import style from './style.module.css'

export function Catalog({ search, products }) {

    if (products?.total === 0) {
        return (
            <div className={style.notfound}>
                По запросу '{search}' ничего не найдено
            </div>
        )
    }

    return (products?.products.map(product => {

        return (
            <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                pictures={product.pictures}
                wight={product.wight}
                discount={product.discount}
            />
        )
    }
    )
    )
}

