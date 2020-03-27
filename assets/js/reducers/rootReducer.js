import { combineReducers } from 'redux'
import bookReducer from '../slices/booksSlice'
import scoreReducer from '../slices/scoresSlice'

const rootReducer = combineReducers({ bookReducer, scoreReducer })

export default rootReducer
