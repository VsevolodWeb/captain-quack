import React from 'react'
import * as Yup from 'yup'
import cn from 'classnames'
import {
    Formik,
    Form,
    Field,
} from 'formik'
import s from './AddingCar.module.scss'
import FormTextElement from '../../../partials/FormTextElement/FormTextElement'

export const CarSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Название машины слишком короткое')
        .max(150, 'Название машины слишком длинное')
        .required('Обязательно для заполнения'),
    text: Yup.string()
        .min(2, 'Описание машины слишком короткое')
        .required('Обязательно для заполнения'),
    price: Yup.number()
        .required('Обязательно для заполнения')
})

const AddingCar: React.FC<{}> = () => {
    return (
        <div>
            <Formik
                initialValues={
                    {
                        name: '', year: '', price: '', text: '', color: '',
                        status: ''
                    }
                }
                onSubmit={(values, {resetForm}) => {
                    // setCover(null)
                    // props.createBook({...values, cover: cover!}, setErrors, resetForm)
                }}
                validationSchema={CarSchema}
            >
                {({errors, touched}) => (
                    <Form className={s.form}>
                        <FormTextElement className={[s.form__item, s.form__item_name]} name="name" placeholder="Название"/>
                        <div className={cn('formElement', s.form__item, s.form__item_year)}>
                            <Field name="year" type="number" className="formElement__element" placeholder="Год"/>
                            {errors.year && touched.year ? (
                                <div className="formElement__hint">{errors.year}</div>
                            ) : null}
                        </div>
                        <div className={cn('formElement', s.form__item, s.form__item_price)}>
                            <Field name="price" type="number" className="formElement__element" placeholder="Цена"/>
                            {errors.price && touched.price ? (
                                <div className="formElement__hint">{errors.price}</div>
                            ) : null}
                        </div>
                        <div className={cn('formElement', s.form__item, s.form__item_text)}>
                            <Field name="text" className="formElement__element" placeholder="Описание"/>
                            {errors.text && touched.text ? (
                                <div className="formElement__hint">{errors.text}</div>
                            ) : null}
                        </div>
                        <div className={cn('formElement', s.form__item, s.form__item_color)}>
                            color
                        </div>
                        <div className={cn('formElement', s.form__item, s.form__item_status)}>
                            status
                        </div>
                        <div className={cn('formElement', s.form__item, s.form__item_button)}>
                            <button className="button">Отправить</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddingCar