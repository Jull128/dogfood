import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Catalog } from "../../components/Catalog/Catalog";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'


export function ProductPage() {
    // const [products, setProducts] = useState({ total: 0, products: [] })
    const navigate = useNavigate()
    const token = useSelector(getTokenSelector)

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    const {
        data: products,
    } = useQuery({
        // queryKey: 'allProducts',
        queryFn: () => api.getProducts(token),
        enabled: !!(token),
    })

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem('token');
    //         // const res = await api.allUsers(token);
    //         const res = await api.getProducts(token);
    //         const responce = await res.json()

    //         setProducts(responce)
    //     }


    //     fetchData()
    // }, [])

    return (
        <div className={style.products}>
            {/* {Search} */}
            <Catalog products={products} />
        </div>
    )
}