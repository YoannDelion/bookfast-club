import { createSlice } from '@reduxjs/toolkit'
import ScoresAPI from '../services/scoresAPI'

const scoresSlice = createSlice({
    name: 'scores',
    initialState: { isFetching: false, scores: [] },
    reducers: {
        fetchingScores: state => {state.isFetching = true},
        receivedScores: (state, action) => {
            state.isFetching = false
            state.scores = action.payload
        },
        failedReceivingScores: state => {state.isFetching = false}
    }
})

export const { fetchingScores, receivedScores, failedReceivingScores } = scoresSlice.actions

export default scoresSlice.reducer

export const fetchAllScores = () => async dispatch => {
    dispatch(fetchingScores())
    try {
        const scores = await ScoresAPI.findAll()
        dispatch(receivedScores(scores))
    } catch (e) {
        dispatch(failedReceivingScores())
    }
}