import { useMutation } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getUserSelector } from "../../redux/slices/tokenSlice"
import { api } from "../../api/api"
import style from './style.module.css'
import { Form, Formik } from "formik"
import { Modal } from "../Modal/Modal"
import { deleteFavoriteProduct } from "../../redux/slices/favoriteSlice"
import { deleteProduct } from "../../redux/slices/cartSlice"

export function DeleteProductModal({ setIsDeleteProductModalOpen, isDeleteProductModalOpen, isInCart, isInFavorite }) {
    const { id } = useParams()
    const { token } = useSelector(getUserSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeDeleteProductModalHandler = () => {
        setIsDeleteProductModalOpen(false)
    }

    const {
        mutateAsync,
    } = useMutation({
        mutationFn: (id) => api.deleteProduct(id, token),
    })

    const deleteProductHandler = async () => {
        await mutateAsync(id)
        if (isInFavorite) {
            dispatch(deleteFavoriteProduct({ id }))
        }
        if (isInCart) {
            dispatch(deleteProduct(id))
        }
        navigate('/')
    }

    return (
        <Modal isOpen={isDeleteProductModalOpen} closeHandler={closeDeleteProductModalHandler}>
            <Formik >
                <Form className={style.form}>
                    <h2 className={style.title}>Вы действительно хотите удалить товар из магазина?</h2>
                    <div className={style.btn__box}>
                        <button className={style.btn_dng} type="button" onClick={deleteProductHandler}>Да</button>
                        <button className={style.btn_sup} type="button" onClick={closeDeleteProductModalHandler}>Нет</button>
                    </div>
                </Form>
            </Formik>
        </Modal>
    )
}