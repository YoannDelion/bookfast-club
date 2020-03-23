import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/forms/Field'
import UsersAPI from '../services/usersAPI'
import { toast } from 'react-toastify'

const SigninPage = ({ history }) => {

    const [user, setUser] = useState({ email: '', password: '', passwordConfirm: '' })
    const [errors, setErrors] = useState({ email: '', password: '', passwordConfirm: '' })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const apiErrors = {}
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = apiErrors.password = 'Passwords differents'
            setErrors(apiErrors)
            toast.error('An error occured')
            return
        }

        try {
            await UsersAPI.create(user)
            setErrors({})
            toast.success('Correctly signed in, you can now log in !')
            history.replace('/login')
        } catch ({ response }) {
            const { violations } = response.data

            if (violations) {
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
                toast.error('An error occured')
            }
        }
    }

    return (
      <div>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
              <Field type={'email'} name={'email'} label={'Mail adress'} error={errors.email} value={user.email}
                     onChange={handleChange}/>
              <Field type={'password'} name={'password'} label={'Password'} error={errors.password}
                     value={user.password} onChange={handleChange}/>
              <Field type={'password'} name={'passwordConfirm'} label={'Confirm password'}
                     error={errors.passwordConfirm}
                     value={user.passwordConfirm} onChange={handleChange}/>
              <div className="form-group">
                  <button type='submit' className={'btn btn-success'}>Submit</button>
                  <Link to={'/login'} className={'btn  btn-link'}>Already have an account ?</Link>
              </div>
          </form>
      </div>
    )
}

export default SigninPage