import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeSearchFilter } from "../../redux/slices/filterSlice"
import { useDebounce } from "../hooks/useDebounce"
import style from './style.module.css'

export function Search() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const debouncedSearchValue = useDebounce(search, 1000)

    const changeSearchHandler = (e) => {
        const newSearchValue = e.target.value

        setSearch(newSearchValue)
    }

    useEffect(() => {
        dispatch(changeSearchFilter(debouncedSearchValue))
    }, [dispatch, debouncedSearchValue])

    return (
        <input
            className={style.searchInput}
            placeholder="Поиск"
            value={search}
            onChange={changeSearchHandler}
        />
    )
}