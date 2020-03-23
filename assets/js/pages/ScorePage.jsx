import React, { useEffect, useState } from 'react'
import Field from '../components/forms/Field'
import ScoresAPI from '../services/scoresAPI'
import { Link } from 'react-router-dom'
import Select from '../components/forms/Select'
import BooksAPI from '../services/booksAPI'
import { toast } from 'react-toastify'
import FormContentLoader from '../components/loaders/FormContentLoader'

const ScorePage = ({ match, history }) => {

    const { id = 'new' } = match.params
    const [score, setScore] = useState({ book: '', score: '', comment: '' })
    const [errors, setErrors] = useState({ book: '', score: '', comment: '' })
    const [editing, setEditing] = useState(false)
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    //Récupère la liste des Books à chaque chargement
    const fetchBooks = async () => {
        try {
            const data = await BooksAPI.findAll()
            setBooks(data)
            setLoading(false)
            if ((!score.book)) setScore({ ...score, book: data[0].id })
        } catch (error) {
            console.log(error.response)
            toast.error('An error occured')
            history.replace('/scores')
        }
    }

    //Récupère le bon score
    const fetchScore = async id => {
        try {
            const data = await ScoresAPI.find(id)
            const { comment, book } = data
            setScore({ score: data.score, comment, book: book.id })
            setLoading(false)
        } catch (error) {
            toast.error('An error occured')
            history.replace('/scores')
        }
    }

    //Récupère la liste des Books à chaque chargement
    useEffect(() => {
        fetchBooks()
    }, [])

    //Récupère le bon score
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true)
            fetchScore(id)
        }
    }, [id])

    //Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault()

        try {
            if (editing) {
                await ScoresAPI.update(id, score)
                toast.success('Updated successfully')
            } else {
                await ScoresAPI.create(score)
                toast.success('Created successfully')
                history.replace('/scores')
            }
            setErrors({})
        } catch ({ response }) {
            const { violations } = response.data

            if (violations) {
                const apiErrors = {}
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
                toast.error('An error occured')
            }
        }
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setScore({ ...score, [name]: value })
    }

    return (
      <div>
          {!editing ? <h1>Create a new Score</h1> : <h1>Update a Score</h1>}

          {loading && <FormContentLoader/>}

          {!loading && (<form onSubmit={handleSubmit}>

              <Select name='book' label='Book' value={score.book} error={errors.book} onChange={handleChange}>
                  {books.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
              </Select>

              <Field label='Score' type='number' value={score.score} name='score' error={errors.score}
                     onChange={handleChange}/>
              <Field label='Comment' value={score.comment} name='comment' error={errors.comment}
                     onChange={handleChange}/>

              <div className='form-group'>
                  <button type='submit' className='btn btn-success'>Save</button>
                  <Link to='/scores' className='btn btn-link'>Go back</Link>
              </div>
          </form>)}
      </div>
    )
}

export default ScorePage