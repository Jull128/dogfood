import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { getUserSelector } from "../../../redux/slices/tokenSlice"
import * as Yup from 'yup'
import { api } from "../../../api/api"
import style from './style.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Modal } from "../../Modal/Modal"
import { getQueryKey } from "../../../pages/Products/util"
import { getSearchSelector } from "../../../redux/slices/filterSlice"

export function AddNewProductModal({ isAddNewProductModalOpen, setIsAddNewProductModalOpen }) {
    const queryClient = useQueryClient()
    const { token } = useSelector(getUserSelector)
    const search = useSelector(getSearchSelector)

    const closeAddNewProductModalOpen = () => {
        setIsAddNewProductModalOpen(false)
    }

    const initialValues = {
        name: '',
        description: '',
        price: 0,
        discount: 0,
        wight: '',
        stock: 0,
        pictures: '',
        available: true,
    }

    // const validatorAddReview = () => Yup.object({
    //     rating: Yup.string()
    //         .required('Обязательное поле'),
    //     text: Yup.string()
    //         .required('Обязательное поле'),
    // })

    const {
        mutateAsync: addNewProduct, isLoading, isError, error
    } = useMutation({
        mutationFn: (values) => api.addNewProduct(values, token),
    })

    const submitHandler = async (values) => {
        console.log(1);
        await addNewProduct(values)
        queryClient.invalidateQueries(['allProduct'])
        closeAddNewProductModalOpen()
    }

    return (
        <Modal isOpen={isAddNewProductModalOpen} closeHandler={closeAddNewProductModalOpen}>
            <Formik
                initialValues={initialValues}
                // validationSchema={validatorAddReview}
                onSubmit={submitHandler}
            >
                <Form className={style.form}>
                    <h2 className={style.title}>Добавить товар</h2>
                    <div className={style.rating}>
                        <label>Наименование</label>
                        <Field name="name" type="text" />
                        <ErrorMessage component="p" name="name" />
                    </div>
                    <div className={style.rating}>
                        <label>Описание</label>
                        <Field name="description" type="text" />
                        <ErrorMessage component="p" name="description" />
                    </div>
                    <div className={style.rating}>
                        <label>Цена</label>
                        <Field name="price" type="number" placeholder="100 ₽" min="0" max="" />
                        <ErrorMessage component="p" name="price" />
                    </div>
                    <div className={style.text}>
                        <label>Скидка</label>
                        <Field name="discount" type="number" placeholder="от 0 до 100 %" min="0" max="100" />
                        <ErrorMessage component="p" name="discount" />
                    </div>
                    <div className={style.rating}>
                        <label>Вес</label>
                        <Field name="wight" type="text" />
                        <ErrorMessage component="p" name="text" />
                    </div>
                    <div className={style.text}>
                        <label>Наличие на складе</label>
                        <Field name="stock" type="number" placeholder="" min="0" max="" />
                        <ErrorMessage component="p" name="stok" />
                    </div>
                    <div className={style.rating}>
                        <label>Изображение</label>
                        <Field placeholder="URL adress of pictures" name="pictures" type="url" />
                        <ErrorMessage component="p" name="pictures" />
                    </div>
                    <div className={style.text}>
                        <label>Товар доступен</label>
                        <Field name="available" type="checkbox" />
                    </div>
                    <button disabled={isLoading} type="submit">Добавить</button>
                    {isError && (
                        <p>
                            {error.message}
                        </p>
                    )}
                </Form>
            </Formik>
        </Modal>
    )
}