import React from 'react'
import {Provider} from 'react-redux'

import './styles/styles.sass'
import store from './store/store'
import Cars from './components/pages/Cars/Cars'
import Header from './components/partials/Header/Header'
import Footer from './components/partials/Footer/Footer'


const App = () => (
    <Provider store={store}>
        <Header/>
        <div className="container">
            <div className="content">
                <Cars/>
            </div>
        </div>
        <Footer/>
    </Provider>
)


export default App