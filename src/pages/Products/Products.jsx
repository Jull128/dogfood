import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { AddNewProductModal } from "../../components/Catalog/AddNewProductModal/AddNewProductModal";
import { Catalog } from "../../components/Catalog/Catalog";
import { getSearchSelector } from "../../redux/slices/filterSlice";
import { getTokenSelector } from "../../redux/slices/userSlice";
import style from './style.module.css'
import { getQueryKey } from "./util";
import { useNavigate } from "react-router-dom";


export function ProductPage() {

    const token = useSelector(getTokenSelector)
    const search = useSelector(getSearchSelector)
    const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] = useState(false)

    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const openAddNewProductModalHandler = () => {
        setIsAddNewProductModalOpen(true)
    }

    const {
        data: products,
    } = useQuery({
        queryKey: getQueryKey(search),
        queryFn: () => api.getProducts(search, token),
        enabled: !!token,
    })

    return (
        <>
            <div className={style.btn__box}><button className={style.btn} onClick={openAddNewProductModalHandler}>Добавить товар</button></div>
            <div className={products?.total !== 0 && style.products}>
                <Catalog search={search} products={products} />
            </div>
            <AddNewProductModal
                isAddNewProductModalOpen={isAddNewProductModalOpen}
                setIsAddNewProductModalOpen={setIsAddNewProductModalOpen}
            />
        </>
    )
}