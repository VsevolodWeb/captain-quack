import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import carsReducer from './cars-reducer'

const rootReducer = combineReducers({
    cars: carsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store