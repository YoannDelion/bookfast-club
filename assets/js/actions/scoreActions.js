import { FAILED_FETCHING_SCORES, FETCHING_SCORES, RECEIVED_SCORES } from '../constants/actionTypes'
import ScoresAPI from '../services/scoresAPI'

const fetchingScores = () => ({ type: FETCHING_SCORES })
const receivedScores = scores => ({ type: RECEIVED_SCORES, payload: scores })
const failedFetchingScores = () => ({ type: FAILED_FETCHING_SCORES })

export const fetchAllScores = () => async dispatch => {
    dispatch(fetchingScores())
    try {
        const scores = await ScoresAPI.findAll()
        return dispatch(receivedScores(scores))
    } catch (error) {
        return dispatch(failedFetchingScores())
    }
}