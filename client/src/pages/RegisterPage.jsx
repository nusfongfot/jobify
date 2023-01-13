import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/wrappers/Logo'
import Joi from 'joi'
import { useAuth } from '../context/authContext'

const formSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(25).required(),
  lastname: Joi.string().alphanum().min(3).max(25).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(6).max(16).required().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')),
})

const defaultUserData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
}

function RegisterPage() {
  const [values, setValues] = useState(defaultUserData)
  const Auth = useAuth()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { value, error } = formSchema.validate(values)
    if (error) {
      const message = error?.details[0].message
      if(message){
        return alert(message)
      }
    } else {
      await Auth.register(values)
    }
    console.log('register succesfully')
  }
  return (
    <Wrapper className='container d-flex flex-column justify-content-center align-items-center vh-100'>
      <div className='row'>
        <div className='col d-flex flex-column justify-content-center align-items-center box'>
          <form
            className='row g-3 needs-validation p-4'
            onSubmit={handleSubmit}
          >
            <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
              <Logo />
              <div className='mt-4 w-100 text-center'>
                <h1>Register</h1>
              </div>
            </div>
            <div className='col-12'>
              <label
                htmlFor='validationCustom01'
                className='form-label'
              >
                Firstname
              </label>
              <input
                type='text'
                name='firstname'
                className='form-control'
                id='validationCustom01'
                value={values.firstname}
                onChange={handleChange}
              />
              <div className='valid-feedback'>Looks good!</div>
            </div>
            <div className='col-12'>
              <label
                htmlFor='validationCustom01'
                className='form-label'
              >
                Lastname
              </label>
              <input
                type='text'
                name='lastname'
                className='form-control'
                id='validationCustom01'
                value={values.lastname}
                onChange={handleChange}
              />
              <div className='valid-feedback'>Looks good!</div>
            </div>
            <div className='col-12'>
              <label
                htmlFor='validationCustom01'
                className='form-label'
              >
                Email
              </label>
              <input
                type='text'
                name='email'
                className='form-control'
                id='validationCustom01'
                value={values.email}
                onChange={handleChange}
              />
              <div className='valid-feedback'>Looks good!</div>
            </div>
            <div className='col-12'>
              <label
                htmlFor='validationCustom02'
                className='form-label'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                className='form-control'
                id='validationCustom02'
                value={values.password}
                onChange={handleChange}
              />
              <div className='valid-feedback'>Looks good!</div>
            </div>
            <div className='col-12 mt-4'>
              <button
                className='button btn-block w-100'
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
          <div className='mb-3'>
            <Link
              className='link'
              to='/'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .box {
    background: var(--box);
    max-width: 400px;
  }
  .link {
    color: var(--primary-500);
    text-decoration: none;
  }
`
export default RegisterPage
