import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {requestStudentData} from './Reducer/apiRequestReducer'
import { changePicker } from './Reducer/userBehaviorReducer'

const rootReducer = combineReducers({requestStudentData, changePicker})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)) 