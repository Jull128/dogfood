import * as Yup from 'yup'

export const authValidationSchema = Yup.object({
    email: Yup.string()
        .email('Неверный адрес почты')
        .required('Обязательное поле'),
    password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Обязательное поле')
})