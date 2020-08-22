import React from 'react'
import s from './Color.module.sass'

type PropsType = {
    color: string
}

const Color: React.FC<PropsType> = ({color}) => {
    return color ? <div className={s.color} style={{backgroundColor: color}}/> : <div>—</div>
}

export default Color