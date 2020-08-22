import {Dispatch} from 'redux'
import shortId from 'shortid'
import {InferActionsTypes} from './store'
import {api} from '../api/cars-api'


export type CarType = {
    id: string | number
    title: string
    description: string
    year: number | ''
    color: string
    status: string
    price: number | ''
}
export type StatusType = {
    [key: string]: string
}
type InitialStateType = {
    list: CarType[]
    colors: Set<string>
    statuses: StatusType
}
type ActionsTypes = InferActionsTypes<typeof actions>


const initialState: InitialStateType = {
    list: [],
    colors: new Set<string>(),
    statuses: {
        pednding: 'В ожидании',
        out_of_stock: 'Нет в наличии',
        in_stock: 'Есть в наличии'
    }
}

const carsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'cars/SET_CARS': {
            return {...state, list: action.cars}
        }

        case 'cars/SET_COLORS': {

            return {...state, colors: action.colors}
        }

        case 'cars/ADDING_CAR': {
            const list = state.list.map(item => Object.assign({}, item))

            list.push({...action.car, id: shortId.generate()})

            return {...state, list}
        }

        case 'cars/REMOVE_CAR': {
            return {...state, list: state.list.filter(item => item.id !== action.id)}
        }

        default: {
            return state
        }
    }
}

export const actions = {
    setCars: (cars: CarType[]) => ({type: 'cars/SET_CARS', cars} as const),
    addingCar: (car: CarType) => ({type: 'cars/ADDING_CAR', car} as const),
    removeCar: (id: number | string) => ({type: 'cars/REMOVE_CAR', id} as const),
    setColors: (colors: Set<string>) => ({type: 'cars/SET_COLORS', colors} as const)
}

export const getCarsThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await api.getCars()

        dispatch(actions.setCars(response))

        const colors = new Set<string>()
        response.forEach(item => {
            colors.add(item.color)
        })
        dispatch(actions.setColors(colors))
    } catch (e) {
        console.log(e)
    }
}

export default carsReducer