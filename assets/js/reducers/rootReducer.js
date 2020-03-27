import { combineReducers } from 'redux'
import bookReducer from './bookReducer'
import scoreReducer from './scoreReducer'

const rootReducer = combineReducers({ bookReducer, scoreReducer })

export default rootReducer
