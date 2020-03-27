import {
    FETCHING_BOOKS,
    RECEIVED_BOOKS,
    FAILED_FETCHING_BOOKS
} from '../constants/actionTypes.js'
import BooksAPI from '../services/booksAPI'

const fetchingBooks = () => ({ type: FETCHING_BOOKS })
const receivedBooks = books => ({ type: RECEIVED_BOOKS, payload: books })
const failedFetchingBooks = () => ({ type: FAILED_FETCHING_BOOKS })

export const fetchAllBooks = () => async dispatch => {
    dispatch(fetchingBooks())
    try {
        const books = await BooksAPI.findAll()
        return dispatch(receivedBooks(books))
    } catch (error) {
        return dispatch(failedFetchingBooks())
    }
}