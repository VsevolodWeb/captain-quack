import React from 'react'
import cn from 'classnames'
import {Field} from 'formik'

type PropsType = {
    className: string[]
    type?: string
    name: string
    title: string
    value: string
    errors?: string
    touched?: boolean
}

const FormTextElement: React.FC<PropsType> = (
    {className, type, name, title, value, errors, touched}
) => {
    return (
        <div className={cn('formTextElement', className)}>
            {value ? <label htmlFor={name} className='formTextElement__label'>{title}</label> : null}
            <Field type={type || 'text'}
                   name={name}
                   id={name}
                   className="formTextElement__element"
                   placeholder={title}/>
            {errors && touched ? (
                <div className="formTextElement__hint">{errors}</div>
            ) : null}
        </div>
    )
}

export default FormTextElement