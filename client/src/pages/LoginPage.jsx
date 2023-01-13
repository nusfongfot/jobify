import styled from 'styled-components'
import logo from '../assets/images/logo.svg'
import Joi from 'joi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useState } from 'react'

const formSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required(),
})

function LoginPage() {
  const AUTH = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = formSchema.validate({ email, password })
    if (error) {
      alert('Please enter a valid email address and password')
    }
    try {
      await AUTH.login({ email, password })
    } catch (error) {
      console.log(error)
    }
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
              <img
                src={logo}
                alt='logo'
              />
              <div className='mt-4'>
                <h1>Login</h1>
              </div>
            </div>
            <div className='col-12'>
              <label
                htmlFor='validationCustom01'
                className='form-label'
              >
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='validationCustom01'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className='form-control'
                id='validationCustom02'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <span>Not a member yet? </span>
            <Link
              className='link'
              to='/register'
            >
              Register
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
export default LoginPage
