import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import { Catalog } from "../../components/Catalog/Catalog";
import { getSearchSelector } from "../../redux/slices/filterSlice";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'
import { getQueryKey } from "./util";


export function ProductPage() {

    const token = useSelector(getTokenSelector)
    const search = useSelector(getSearchSelector)

    const {
        data: products,
    } = useQuery({
        queryKey: getQueryKey(search),
        queryFn: () => api.getProducts(search, token),
        enabled: !!(token),
    })

    return (
        <div className={(products?.total !== 0) && style.products}>
            <Catalog search={search} products={products} />
        </div>
    )
}