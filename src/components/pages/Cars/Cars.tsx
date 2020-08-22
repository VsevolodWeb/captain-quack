import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import cn from 'classnames'
import {AppStateType} from '../../../store/store'
import {actions, CarType, getCarsThunkCreator, StatusType} from '../../../store/cars-reducer'
import AddingCar from './AddingCar/AddingCar'
import s from './Cars.module.scss'
import Color from '../../partials/Color/Color'

type PropsType = {
    cars: CarType[]
    colors: Set<string>
    statuses: StatusType
    getCars: () => void
    addingCar: (car: CarType) => void
    removeCar: (id: number | string) => void
}

const Cars: React.FC<PropsType> = props => {
    const getCars = props.getCars

    useEffect(() => {
        getCars()
    }, [getCars])

    const removeCar = (id: number | string) => {
        props.removeCar(id)
    }

    return <>
        <AddingCar colors={props.colors} statuses={props.statuses} addingCar={props.addingCar}/>
        <div className="cars">
            <h1 className="title title_lg">Автомобили в наличии</h1>
            <div className="table cars__table">
                <div className={cn(s.table__row, 'table__header', 'table__row')}>
                    <div className="table__cell">Название</div>
                    <div className="table__cell">Год</div>
                    <div className="table__cell">Цвет</div>
                    <div className="table__cell">Статус</div>
                    <div className="table__cell">Цена</div>
                    <div className="table__cell"/>
                </div>

                {props.cars.map(item => (
                    <div className={cn('table__row', s.table__row)} key={item.id}>
                        <div className={cn('table__cell', s.table__cell_title)}>
                            {item.title}
                            <div className="table__hint">
                                {item.description}
                            </div>
                        </div>
                        <div className={cn('table__cell', s.table__cell_year)}>{item.year}</div>
                        <div className={cn('table__cell', s.table__cell_color)}>
                            <Color color={item.color}/>
                        </div>
                        <div
                            className={cn('table__cell', s.table__cell_status)}>
                            {props.statuses[item.status] || '—'}
                        </div>
                        <div className={cn('table__cell', s.table__cell_price)}>
                            {Intl.NumberFormat('Ru-ru', {
                                style: 'currency',
                                currency: 'RUB'
                            }).format(+item.price).replace(/\D00(?=\D*$)/, '')}</div>
                        <div className={cn('table__cell', s.table__cell_button)}>
                            <button onClick={() => removeCar(item.id)} className="button button_secondary">Удалить
                            </button>
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

export default connect(
    mapStateToProps,
    {
        getCars: getCarsThunkCreator,
        addingCar: actions.addingCar,
        removeCar: actions.removeCar
    }
)(Cars)