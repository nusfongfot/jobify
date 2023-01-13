import main from '../assets/images/main.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../assets/wrappers/Logo'

function LandingPage() {
  return (
    <Wrapper className='container'>
      <div className='row'>
        <div className='col-12 mt-4'>
          <Logo />
        </div>
        <div className='col-lg-6 col-12 d-flex flex-column justify-content-center info'>
          <h1>
            job <span>tracking</span> App
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
            vero asperiores odio repellat iste necessitatibus, repellendus error
            facere impedit expedita eius perferendis blanditiis? Suscipit
            facilis, incidunt necessitatibus autem ab in!
          </p>
          <Link to='/login'>
            <button className='button btn-hero w-50 p-2'>
              Login / Register
            </button>
          </Link>
        </div>
        <div className='col-lg-6 col-12 d-flex flex-column justify-content-center'>
          <img
            src={main}
            alt='job hunt'
            className='img main-img d-none d-lg-block'
          />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h1 {
    font-weight: 700;
    font-size: 3rem;
    span {
      color: var(--primary-500);
    }
  }
  @media screen and (max-width: 991px) {
    .info {
      transform: translateY(50%);
    }
  }
`
export default LandingPage
