import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import {AppStateType} from '../../../store/store'
import {actions, CarType, getCarsThunkCreator, StatusType} from '../../../store/cars-reducer'
import AddingCar from './AddingCar/AddingCar'
import s from './Cars.module.sass'
import Color from '../../partials/Color/Color'

type PropsType = {
    cars: CarType[]
    colors: string[]
    statuses: StatusType
    getCars: () => void
    removeCar: (id: number) => void
}

const Cars: React.FC<PropsType> = props => {
    const getCars = props.getCars

    useEffect(() => {
        getCars()
    }, [getCars])

    const removeCar = (id: number) => {
        props.removeCar(id)
    }

    return <>
        <AddingCar/>
        <div className="cars">
            <h1 className="title">Автомобили в наличии</h1>
            <div className="table cars__table">
                <div className={cn('table__header', 'table__row', s.table__row)}>
                    <div className="table__cell">Название</div>
                    <div className="table__cell">Год</div>
                    <div className="table__cell">Цвет</div>
                    <div className="table__cell">Статус</div>
                    <div className="table__cell">Цена</div>
                    <div className="table__cell"/>
                </div>

                {props.cars.map(item => (
                    <div className={cn('table__row', s.table__row)} key={item.id}>
                        <div className="table__cell">
                            {item.title}
                            <div className="table__hint">
                                {item.description}
                            </div>
                        </div>
                        <div className="table__cell">{item.year}</div>
                        <div className="table__cell">
                            <Color color={item.color}/>
                        </div>
                        <div className="table__cell">{props.statuses[item.status] || '—'}</div>
                        <div className="table__cell">{Intl.NumberFormat('Ru-ru', { style: 'currency', currency: 'RUB'}).format(item.price).replace(/\D00(?=\D*$)/, '')}</div>
                        <div className="table__cell">
                            <button onClick={() => removeCar(item.id)}>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}

const mapStateToProps = (state: AppStateType) => ({
    cars: state.cars.list,
    colors: state.cars.colors,
    statuses: state.cars.statuses
})

export default connect(mapStateToProps, {getCars: getCarsThunkCreator, removeCar: actions.removeCar})(Cars)