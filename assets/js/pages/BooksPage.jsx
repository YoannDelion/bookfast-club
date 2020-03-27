import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import BooksAPI from '../services/booksAPI'
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'
import { connect } from 'react-redux'
import { fetchAllBooks } from '../actions/bookActions'

const BooksPage = ({ books, isFetching, fetchAllBooks }) => {

    // const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    // const [loading, setLoading] = useState(isFetching)

    // //Récupère les books
    // async function fetchBooks () {
    //     try {
    //         const data = await BooksAPI.findAll()
    //         setBooks(data)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error.response)
    //         toast.error('An error occured')
    //     }
    // }

    //Au chargement du composant on récupère les books
    useEffect(() => {
        fetchAllBooks()
    }, [])

    //
    // //Gestion de la suppression d'un book
    // const handleDelete = async id => {
    //     const originalBooks = [...books]
    //     setBooks(books.filter(book => book.id !== id))
    //     try {
    //         await BooksAPI.delete(id)
    //         toast.success('Deleted successfully')
    //     } catch (error) {
    //         setBooks(originalBooks)
    //         toast.error('An error occured')
    //     }
    // }
    //
    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page)

    //Gestion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }

    const itemsPerPage = 10

    //Filtrage des données
    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase())
      || b.author.toLowerCase().includes(search.toLowerCase()))

    //Pagination des données
    const paginatedBooks = Pagination.getData(filteredBooks, currentPage, itemsPerPage)

    return (
      <>
          <div className="mb-3 d-flex justify-content-between align-items-center">
              <h1>Books List</h1>
              <Link to='/books/new' className='btn btn-primary'>Add a new book</Link>
          </div>

          <div className="form-group">
              <input onChange={handleSearch}
                     value={search}
                     type="text"
                     className="form-control"
                     placeholder="Rechercher..."/>
          </div>

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
              {!isFetching && (
                <tbody>
                {paginatedBooks.map(book => <tr key={book.id}>
                      <td>{book.id}</td>
                      <td><Link to={`/books/${book.id}`}>{book.title}</Link></td>
                      <td>{book.author}</td>
                      {/*Il faudrait virtualiser le calcul de la note dans l'entité PHP*/}
                      <td className={'text-center'}><span
                        className="badge badge-light">{1254.45.toLocaleString()}</span>
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
              )}
          </table>
          {isFetching && <TableLoader/>}


          {filteredBooks.length > itemsPerPage && (
            <Pagination currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredBooks.length}
                        onPageChanged={handlePageChange}/>
          )}
      </>
    )
}

const mapStateToProps = (state) => ({
    books: state.bookReducer.books,
    isFetching: state.bookReducer.isFetching
})

export default connect(mapStateToProps, { fetchAllBooks })(BooksPage)