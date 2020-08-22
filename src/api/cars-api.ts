import {instance} from './api'
import {CarType} from '../store/cars-reducer'

export const api = {
    getCars() {
        return instance.get<CarType[]>('').then(response => response.data)
    }
}