import { useEffect, useState } from "react"
import { api } from "../../api/api";
import { Catalog } from "../../components/Catalog/Catalog";
import style from './style.module.css'


export function ProductPage() {
    const [products, setProducts] = useState({ total: 0, products: [] })

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            // const res = await api.allUsers(token);
            const res = await api.getProducts(token);
            const responce = await res.json()

            setProducts(responce)
        }


        fetchData()
    }, [])

    return (
        <div className={style.products}>
            {/* {Search} */}
            <Catalog products={products} />
        </div>
    )
}