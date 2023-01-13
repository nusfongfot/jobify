import { Link } from 'react-router-dom'
import errImg from '../assets/images/not-found.svg'
import styled from 'styled-components'

function ErrorPage() {
  return (
    <Wrapper className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <img
        src={errImg}
        alt='not found'
        className='img-err'
      />
      <h3 className='mt-sm-5 mt-0'>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link className='link' to='/'>
        <span>Back to Home</span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .img-err {
    width: 100%;
    height: 350px;
  }
  .link {
    color: var(--primary-500);
    text-decoration: none;
  }
`
export default ErrorPage
