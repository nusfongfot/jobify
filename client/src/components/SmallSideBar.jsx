import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import links from '../utils/links'
import Logo from '../assets/wrappers/Logo'
import { useState } from 'react'
function SmallSideBar() {
  const [isShow, setIsShow] = useState(false)
  return (
    <Wrapper>
      <div className={!isShow ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button
            type='button'
            className='close-btn'
            onClick={() => setIsShow(true)}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <nav>
            {links.map((item) => {
              return (
                <div className='text-dark d-flex align-items-center' key={item.id}>
                  <ul >
                    {item.icon}
                    {item.text}
                  </ul>
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .sidebar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    position: fixed;
    transition: var(--transition);
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    inset: 0;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background-color: white;
    min-height: 95vh;
    padding: 4rem 2rem;
    width: 90vw;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    color: var(--red-dark);
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
  }
`
export default SmallSideBar
