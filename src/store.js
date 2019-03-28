import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {requestStudentData, changeBatch} from './reducer'

const rootReducer = combineReducers({requestStudentData, changeBatch})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)) 