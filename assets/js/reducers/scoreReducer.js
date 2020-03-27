import { FAILED_FETCHING_SCORES, FETCHING_SCORES, RECEIVED_SCORES } from '../constants/actionTypes'

const initialState = {
    scores: [],
    isFetching: false
}

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_SCORES:
            return { ...state, isFetching: true }
        case RECEIVED_SCORES:
            return { ...state, isFetching: false, scores: action.payload }
        case FAILED_FETCHING_SCORES:
            return { ...state, isFetching: false }
        default:
            return state
    }
}

export default scoreReducer