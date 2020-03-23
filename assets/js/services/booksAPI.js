import axios from 'axios'
import Cache from './cache'
import { BOOKS_API } from '../config'

const findAll = async () => {
    const cachedBooks = await Cache.get('books')
    if (cachedBooks) return cachedBooks
    return axios.get(BOOKS_API)
      .then(response => {
          const books = response.data['hydra:member']
          Cache.set('books', books)
          return books
      })
}

const deleteBook = id => {
    return axios.delete(`${BOOKS_API}/${id}`)
      .then(async response => {
          const cachedBooks = await Cache.get('books')
          if (cachedBooks) Cache.set('books', cachedBooks.filter(c => c.id !== id))
          return response
      })
}

const find = async id => {
    const cachedBook = await Cache.get(`books.${id}`)

    if (cachedBook) return cachedBook

    return axios.get(`${BOOKS_API}/${id}`)
      .then(response => {
          const customer = response.data
          Cache.set(`books.${id}`, customer)
          return customer
      })
}

const update = (id, book) => {
    return axios.put(`${BOOKS_API}/${id}`, book)
      .then(async response => {
          const cachedBooks = await Cache.get('books')
          const cachedBook = await Cache.get(`books.${id}`)

          if (cachedBook) Cache.set(`books.${id}`, response.data)

          if (cachedBooks) {
              const index = cachedBooks.findIndex(c => c.id === +id)
              cachedBooks[index] = response.data
          }
          return response
      })
}

const create = book => {
    return axios.post(BOOKS_API, book)
      .then(async response => {
          const cachedBooks = await Cache.get('books')
          if (cachedBooks) Cache.set('books', [...cachedBooks, book])
          return response
      })
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteBook
}