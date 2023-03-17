import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserSelector } from "../../../redux/slices/tokenSlice"
import * as Yup from 'yup'
import { api } from "../../../api/api"
import style from './style.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Modal } from "../../Modal/Modal"

export function AddReviewModal({ setIsAddReviewModalOpen, isAddReviewModalOpen }) {
    const queryClient = useQueryClient()
    const { id } = useParams()
    const { token } = useSelector(getUserSelector)

    const closeAddReviewModalHandler = () => {
        setIsAddReviewModalOpen(false)
    }

    const initialValues = {
        rating: '',
        text: '',
    }

    const validatorAddReview = () => Yup.object({
        rating: Yup.string()
            .required('Обязательное поле'),
        text: Yup.string()
            .required('Обязательное поле'),
    })

    const {
        mutateAsync, isLoading,
    } = useMutation({
        mutationFn: (values) => api.addReviewById(id, token, values),
    })


    const submitHandler = async (values) => {
        await mutateAsync(values)
        queryClient.invalidateQueries(['reviews'])
        closeAddReviewModalHandler()
    }


    return (
        <Modal isOpen={isAddReviewModalOpen} closeHandler={closeAddReviewModalHandler}>
            <Formik
                initialValues={initialValues}
                validationSchema={validatorAddReview}
                onSubmit={submitHandler}
            >
                <Form className={style.form}>
                    <h2 className={style.title}>Добавить отзыв</h2>
                    <div className={style.rating}>
                        <label>Ваша оценка товара</label>
                        <Field name="rating" type="number" placeholder="от 1 до 5" min="1" max="5" />
                        <ErrorMessage component="p" name="rating" />
                    </div>
                    <div className={style.text}>
                        <label>Комментарий</label>
                        <Field as="textarea" name="text" type="text" />
                        <ErrorMessage component="p" name="text" />
                    </div>
                    <button disabled={isLoading} type="submit">Добавить</button>
                </Form>
            </Formik>
        </Modal>
    )
}