import React from 'react'
import * as Yup from 'yup'
import cn from 'classnames'
import {
    Formik,
    Field,
    Form
} from 'formik'
import s from './AddingCar.module.scss'
import FormTextElement from '../../../partials/FormTextElement/FormTextElement'
import Color from '../../../partials/Color/Color'
import {CarType, StatusType} from '../../../../store/cars-reducer'

export const CarSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Название машины слишком короткое')
        .max(150, 'Название машины слишком длинное')
        .required('Обязательно для заполнения'),
    description: Yup.string()
        .min(2, 'Описание машины слишком короткое')
        .required('Обязательно для заполнения'),
    year: Yup.number()
        .required('Обязательно для заполнения'),
    price: Yup.number()
        .required('Обязательно для заполнения'),
    status: Yup.string()
        .required('Обязательно для заполнения')
})

type PropsType = {
    colors: Set<string>
    statuses: StatusType
    addingCar: (car: CarType) => void
}

const AddingCar: React.FC<PropsType> = ({colors, statuses, addingCar}) => {
    return (
        <div>
            <Formik
                initialValues={
                    {
                        title: '', year: '', price: '', description: '', color: 'white', status: ''
                    } as CarType
                }
                onSubmit={(values, {resetForm}) => {
                    addingCar(values)
                    resetForm()
                }}
                validationSchema={CarSchema}
            >
                {({errors, touched, values}) => (
                    <Form className={s.form}>
                        <FormTextElement className={[s.form__item, s.form__item_name]}
                                         name="title"
                                         title="Название"
                                         value={values.title}
                                         errors={errors.title}
                                         touched={touched.title}
                        />
                        <FormTextElement className={[s.form__item, s.form__item_year]}
                                         name="year"
                                         title="Год"
                                         type="number"
                                         value={JSON.stringify(values.year)}
                                         errors={errors.year}
                                         touched={touched.year}
                        />
                        <FormTextElement className={[s.form__item, s.form__item_price]}
                                         type="number"
                                         name="price"
                                         title="Цена"
                                         value={JSON.stringify(values.price)}
                                         errors={errors.price}
                                         touched={touched.price}
                        />
                        <FormTextElement className={[s.form__item, s.form__item_text]}
                                         name="description"
                                         title="Описание"
                                         value={values.description}
                                         errors={errors.description}
                                         touched={touched.description}
                        />
                        <div className={cn('formTextElement', s.form__item, s.form__item_color)}>
                            <label className='formTextElement__label'>Цвет</label>
                            <div className={s.radioWrapper}>
                                {
                                    Array.from(colors).map((item) => {
                                            const id = 'form-color-' + item

                                            return <div className={s.radio__item} key={item}>
                                                <Field
                                                    id={id}
                                                    value={item}
                                                    name="color"
                                                    type="radio"
                                                    className={s.radio}
                                                />
                                                <label htmlFor={id} className={s.radio__label}>
                                                    <Color color={item}/>
                                                </label>
                                            </div>
                                        }
                                    )
                                }
                            </div>
                        </div>
                        <div className={cn('formTextElement', s.form__item, s.form__item_status)}>
                            <Field
                                name="status"
                                className="formTextElement__element"
                                as="select"
                            >
                                <option value='' disabled>Статус</option>
                                {Object.keys(statuses).map(key => (
                                        <option value={key} key={key}>{statuses[key]}</option>
                                    )
                                )}
                            </Field>
                            {errors.status && touched.status ? (
                                <div className="formTextElement__hint">{errors.status}</div>
                            ) : null}
                        </div>
                        <div className={cn('formElement', s.form__item, s.form__item_button)}>
                            <button className={cn('button', 'button_default', s.button)}
                                    type="submit">Отправить ᐳ
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddingCar