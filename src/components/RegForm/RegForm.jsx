// import { Input, Form, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/api';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import style from './style.module.css'

export function RegForm() {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        group: '9-gr',
        password: '',
        avatar: ''
    }

    const { mutateAsync, isLoading, isError, error } = useMutation({
        mutationFn: (values) => api.reg(values),
    })

    const submitHandler = async (values) => {
        await mutateAsync(values)
        navigate('/')
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
        >
            <Form className={style.form}>

                <Field name="email" type="email" placeholder="email" className={style.field} />
                <ErrorMessage component="p" name="email" className={style.error} />

                <Field name="group" type="text" placeholder="9-gr" className={style.field} />
                <ErrorMessage component="p" name="group" className={style.error} />

                <Field name="password" type="password" placeholder="password" className={style.field} />
                <ErrorMessage component="p" name="password" className={style.error} />

                <Field name="avatar" type="text" placeholder="URL adress" className={style.field} />
                <ErrorMessage component="p" name="avatar" className={style.error} />

                <button disabled={isLoading} type="submit" className={style.button}  >Sign Up</button>
                {isError && (
                    <p >
                        {error.message}
                    </p>
                )}
            </Form>
        </Formik>
    )
}