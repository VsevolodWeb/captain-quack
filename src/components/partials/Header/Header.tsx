import React from 'react'
import logo from './logo.png'
import s from './Header.module.sass'

const Header = () => {
    return <>
        <header className={s.header}>
            <img className={s.logo} src={logo} alt="Captain Quack"/>
        </header>
        <div className={s.intro}>¡Ay caramba!</div>
    </>
}

export default Header