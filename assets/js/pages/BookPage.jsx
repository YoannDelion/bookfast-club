import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/forms/Field'
import BooksAPI from '../services/booksAPI'
import { toast } from 'react-toastify'
import FormContentLoader from '../components/loaders/FormContentLoader'

const BookPage = ({ match, history }) => {

    const { id = 'new' } = match.params
    const [book, setBook] = useState({ title: '', summary: '', author: '' })
    const [errors, setErrors] = useState({ title: '', summary: '', author: '' })
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    //Recupère le book en fonction de l'id
    const fetchBook = async id => {
        try {
            const { title, summary, author } = await BooksAPI.find(id)
            setLoading(false)
            setBook({ title, summary, author })
        } catch (errors) {
            toast.error('An error occured')
            history.replace('/books')
        }
    }

    //Chargement du book si besoin au chargement ou au changement de l'id
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true)
            setLoading(true)
            fetchBook(id)
        }
    }, [id])

    //Gestion des changements des inputs du formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setBook({ ...book, [name]: value })
    }

    //Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault()

        try {
            setErrors({})
            if (editing) {
                await BooksAPI.update(id, book)
                toast.success('Updated successfully')
            } else {
                await BooksAPI.create(book)
                toast.success('Created successfully')
                history.replace('/books')
            }
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

    return (
      <>
          {!editing ? <h1>Create a book</h1> : <h1>Update a book</h1>}

          {loading && <FormContentLoader/>}

          {!loading && (<form onSubmit={handleSubmit}>
                <Field name='title' label='Book title' value={book.title} onChange={handleChange} error={errors.title}/>
                <Field name='summary' label='Book summary' value={book.summary} onChange={handleChange}
                       error={errors.summary}/>
                <Field name='author' label='Book author' value={book.author} onChange={handleChange}
                       error={errors.author}/>

                <div className='form-group'>
                    <button type='submit' className='btn btn-success'>Save</button>
                    <Link to='/books' className='btn btn-link'>Go back</Link>
                </div>
            </form>
          )}
      </>
    )
}

export default BookPage