import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { logger } from 'redux-logger';
import rootReducer from './reducers/rootReducer'

const middleware = [...getDefaultMiddleware(), logger]

// Takes an object with named fiels as arguments
// Redux DevTools enabled automatically
// thunk is a default middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
})

export default store