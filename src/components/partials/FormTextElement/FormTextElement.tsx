import React from 'react'
import cn from 'classnames'
import {Field} from 'formik'

type PropsType = {
    className: string[]
    name: string
    placeholder: string
    errors?: string
    touched?: string
}

const FormTextElement: React.FC<PropsType> = (
    {className, name, placeholder, errors, touched}
) => {
    return (
        <div className={cn('formElement', className)}>
            <Field name={name} className="formElement__element" placeholder={placeholder}/>
            {errors && touched ? (
                <div className="formElement__hint">{errors}</div>
            ) : null}
        </div>
    )
}

export default FormTextElement