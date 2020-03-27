import { FAILED_FETCHING_BOOKS, FETCHING_BOOKS, RECEIVED_BOOKS } from '../constants/actionTypes.js'

const initialState = { isFetching: false, books: [] }

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_BOOKS:
            return { ...state, isFetching: true }
        case RECEIVED_BOOKS:
            return { ...state, books: action.payload, isFetching: false }
        case FAILED_FETCHING_BOOKS:
            return { ...state, isFetching: false }
        default:
            return state
    }
}

export default bookReducer