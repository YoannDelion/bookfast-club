import React, { useEffect, useState } from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import ScoresAPI from '../services/scoresAPI'
import moment from 'moment'
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'
import { fetchAllScores } from '../actions/scoreActions'

const ScoresPage = ({scores, isFetching, fetchAllScores}) => {

    // const [scores, setScores] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    // const [loading, setLoading] = useState(true)

    // const fetchScores = async () => {
    //     try {
    //         const data = await ScoresAPI.findAll()
    //         setScores(data)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error.response)
    //         toast.error('An error occured')
    //     }
    // }

    useEffect(() => {
        fetchAllScores()
    }, [])

    // const handleDelete = async id => {
    //     const originalScores = [...scores]
    //     setScores(scores.filter(book => book.id !== id))
    //     try {
    //         await ScoresAPI.delete(id)
    //         toast.success('Score deleted')
    //     } catch (error) {
    //         setScores(originalScores)
    //         toast.error('An error occured')
    //     }
    // }

    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page)

    //Gestion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }

    const itemsPerPage = 10

    //Filtrage des données
    const filteredScores = scores.filter(s => s.comment.toLowerCase().includes(search.toLowerCase()))

    //Pagination des données
    const paginatedScores = Pagination.getData(filteredScores, currentPage, itemsPerPage)

    const formatDate = str => moment(str).format('DD/MM/YYYY')

    return (
      <>
          <div className="mb-3 d-flex justify-content-between align-items-center">
              <h1>Scores List</h1>
              <Link to='scores/new' className='btn btn-primary'>Add a new score</Link>
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
                  <th className={'text-center'}>Score</th>
                  <th>Comment</th>
                  <th>Created At</th>
                  <th></th>
              </tr>
              </thead>
              {!isFetching && (
                <tbody>
                {paginatedScores.map(score => <tr key={score.id}>
                      <td>{score.id}</td>
                      <td className={'text-center'}>{score.score}</td>
                      <td>{score.comment}</td>
                      <td>{formatDate(score.createdAt)}</td>
                      <td>
                          <Link to={`/scores/${score.id}`} className="btn btn-sm btn-primary">Edit</Link>
                          <button onClick={() => handleDelete(score.id)}
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

          {filteredScores.length > itemsPerPage && (
            <Pagination currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredScores.length}
                        onPageChanged={handlePageChange}/>
          )}
      </>
    )
}

const mapStateToProps = state => ({
    scores: state.scoreReducer.scores,
    isFetching: state.scoreReducer.isFetching
})

export default connect(mapStateToProps, { fetchAllScores})(ScoresPage)