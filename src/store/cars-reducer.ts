import {Dispatch} from 'redux'
import {InferActionsTypes} from './store'
import {api} from '../api/cars-api'


export type CarType = {
    id: number
    title: string
    description: string
    year: number
    color: string
    status: string
    price: number
}
export type StatusType = {
    [key: string]: string
}
type InitialStateType = {
    list: CarType[]
    colors: string[]
    statuses: StatusType
}
type ActionsTypes = InferActionsTypes<typeof actions>


const initialState: InitialStateType = {
    list: [],
    colors: [],
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
    removeCar: (id: number) => ({type: 'cars/REMOVE_CAR', id} as const),
    setColors: (colors: string[]) => ({type: 'cars/SET_COLORS', colors} as const)
}

export const getCarsThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await api.getCars()

        dispatch(actions.setCars(response))
        dispatch(actions.setColors(response.map(item => item.color)))
    } catch (e) {
        console.log(e)
    }
}

export const addingCarThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        //dispatch(actions.setColors(response.map(item => item.color)))
    } catch (e) {
        console.log(e)
    }
}

export default carsReducer