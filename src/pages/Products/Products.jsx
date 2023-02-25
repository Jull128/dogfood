import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Catalog } from "../../components/Catalog/Catalog";
import { Search } from "../../components/search/Search";
import { getSearchSelector } from "../../redux/slices/filterSlice";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'
import { getQueryKey, getQuerySearchKey } from "./util";


export function ProductPage() {

    const navigate = useNavigate()
    const token = useSelector(getTokenSelector)
    const search = useSelector(getSearchSelector)

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);

    const {
        data: products,
    } = useQuery({
        queryKey: getQueryKey(search),
        queryFn: () => api.getProducts(search, token),
        enabled: !!(token),
    })

    return (
        <div className={style.products}>
            <Catalog products={products} />
        </div>
    )
}