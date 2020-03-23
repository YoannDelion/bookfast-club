import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../components/Pagination'

const BooksPageWithPagination = () => {

    const [books, setBooks] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 10

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books?pagination=true&itemsPerPage=${itemsPerPage}&page=${currentPage}`)
          .then(response => {
              setBooks(response.data['hydra:member'])
              setTotalItems(response.data['hydra:totalItems'])
              setLoading(false)
          })
          .catch(error => console.log(error.response))
    }, [currentPage])

    const handleDelete = id => {
        const originalBooks = [...books]

        setBooks(books.filter(book => book.id !== id))

        axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
          .then(response => console.log('ok'))
          .catch(error => {
              console.log(error.response)
              setBooks(originalBooks)
          })
    }

    const handlePageChange = page => {
        setLoading(true)
        setCurrentPage(page)
    }

    return (
      <>
          <h1>Book list paginated</h1>
          <table className="table table-hover">
              <thead>
              <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th className={'text-center'}>Score</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              {loading && <tr>
                  <td>Loading ...</td>
              </tr>}
              {!loading && books.map(book => <tr key={book.id}>
                    <td>{book.id}</td>
                    <td><a href="#">{book.title}</a></td>
                    <td>{book.author}</td>
                    {/*Il faudrait virtualiser le calcul de la note dans l'entité PHP*/}
                    <td className={'text-center'}><span className="badge badge-light">{1254.45.toLocaleString()}</span>
                    </td>
                    <td>
                        {/*<button className="btn btn-primary">Show</button>*/}
                        <button onClick={() => handleDelete(book.id)}
                                disabled={book.scores.length > 0}
                                className="btn btn-sm btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>
              )}
              </tbody>
          </table>

          <Pagination currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      length={totalItems}
                      onPageChanged={handlePageChange}/>
      </>
    )
}

export default BooksPageWithPagination