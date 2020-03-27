import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'
import { fetchAllBooks } from './actions/bookActions'
import bookReducer from './reducers/bookReducer'

const loggerMiddleware = createLogger()
const middleware = [thunkMiddleware, loggerMiddleware]

const store = createStore(
  rootReducer
  , compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store