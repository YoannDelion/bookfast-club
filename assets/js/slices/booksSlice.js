import { createSlice } from '@reduxjs/toolkit'
import BooksAPI from '../services/booksAPI'

// createSlice: accepts an initial state and a lookup table with reducer names and functions,
// and automatically generates action creator functions, action type strings, and a reducer function.
const booksSlice = createSlice({
    // prefix for generated action types
    name: 'books',
    // initial state value for the reducer
    initialState: { isFetching: false, books: [] },
    // keys will become action type strings, and the functions are reducers that will be run when that action type is dispatched
    reducers: {
        fetchingBooks: (state) => {state.isFetching = true},
        receivedBooks: (state, action) => {
            state.books = action.payload
            state.isFetching = false
        },
        failedFetchingBooks: (state) => {state.isFetching = false}
    }
})

export const { fetchingBooks, receivedBooks, failedFetchingBooks } = booksSlice.actions

export default booksSlice.reducer

export const fetchAllBooks = () => async dispatch => {
    dispatch(fetchingBooks())
    try {
        const books = await BooksAPI.findAll()
        return dispatch(receivedBooks(books))
    } catch (error) {
        return dispatch(failedFetchingBooks())
    }
}