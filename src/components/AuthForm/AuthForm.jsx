import { api } from '../../api/api';
import { Link } from 'react-router-dom';
import style from './style.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'


export function AuthForm() {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
    }

    const { mutateAsync, isLoading, isError, error } = useMutation({
        mutationFn: (values) => api.auth(values).then(data => {
            localStorage.setItem("token", data.token)
        })
    })

    const submitHandler = async (values) => {
        await mutateAsync(values)
        navigate('/products')
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
        >
            <Form className={style.form}>
                <Field className={style.field} name="password" placeholder="password here" type="password" />
                <ErrorMessage component="p" className={style.error} name="password" />

                <Field className={style.field} name="email" placeholder="email here" type="email" />
                <ErrorMessage component="p" className={style.error} name="email" />

                <button disabled={isLoading} type="submit" className={style.button} >Войти</button>
                Or <Link to="/signup">Sign up</Link>
            </Form>
        </Formik>
    )
}

