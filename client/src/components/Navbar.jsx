import styled from 'styled-components'
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import SmallSideBar from './SmallSideBar'

function Navbar() {
  const [isShow, setIsShow] = useState(false)
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  const { logout, user } = useAuth()
  return (
    <Wrapper className='d-flex align-items-center justify-content-between p-2'>
      <button
        className='toggle_btn d-sm-none'
        onClick={() => setIsShowSidebar(!isShowSidebar)}        
      >
        <FaAlignLeft />
      </button>
      <div>{isShowSidebar && <SmallSideBar />}</div>
      <div className='logo'>DashBoard</div>
      <div className='container-btn'>
        <button
          type='button'
          className='btn-user'
          onClick={() => setIsShow(!isShow)}          
        >
          <FaUserCircle />
          {user.firstname}
          <FaCaretDown />
        </button>
        {isShow && (
          <div className=''>
            <button
              type='button'
              className='dropdown-btn'
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--box);
  height: var(--nav-height);
  .toggle_btn {
    background-color: transparent;
    color: var(--primary-500);
    font-size: 1.75rem;
    outline: none;
    border: none;
  }
  .logo {
    color: var(--primary-500);
    font-size: 1.75rem;
  }
  .btn-user {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    width: 6rem;
    background-color: var(--primary-500);
    color: white;
    position: relative;
  }
  .dropdown-btn {
    background: var(--primary-100);
    padding: 0.2rem;
    width: 6rem;
    position: absolute;
    top: 70px;
    color: var(--primary-600);
  }
`
export default Navbar
