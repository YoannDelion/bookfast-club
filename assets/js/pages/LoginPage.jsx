import React, { useState, useContext } from 'react'
import AuthAPI from '../services/authAPI'
import AuthContext from '../contexts/AuthContext'
import Field from '../components/forms/Field'
import { toast } from 'react-toastify'

const LoginPage = ({ history }) => {

    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const { setIsAuthenticated } = useContext(AuthContext)

    //Gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget

        setCredentials({ ...credentials, [name]: value })
    }

    //Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault()

        try {
            await AuthAPI.authenticate(credentials)
            setError('')
            setIsAuthenticated(true)
            toast.success('Successfully logged in ! :D')
            history.replace('/books')
        } catch (error) {
            setError('Invalid credentials')
            toast.error('An error occured')
        }
    }

    return (
      <>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
              <Field
                name='username'
                label='Mail adress'
                value={credentials.username}
                onChange={handleChange}
                type='email'
                error={error}
              />
              <Field
                name='password'
                label='Password'
                value={credentials.password}
                onChange={handleChange}
                type='password'
              />
              <div className='form-group'>
                  <button type={'submit'} className='btn btn-success'>Login</button>
              </div>
          </form>
      </>
    )
}

export default LoginPage