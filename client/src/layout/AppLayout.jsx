import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import BigSideBar from '../components/BigSideBar'
import SmallSideBar from '../components/SmallSideBar'
import Navbar from '../components/Navbar'
import { useLoading } from '../context/loadingContext'

function AppLayout() {
  const { loading } = useLoading()
  return (
    <div className='container-fluid d-flex flex-column'>
      <div className='row'>
        <div className='col-12 p-0 d-sm-none'>
          <SmallSideBar />
        </div>
        <div className='col-lg-2 col-sm-3 col-md-2 p-0 d-none d-sm-block'>
          <BigSideBar />
        </div>
        <div className='col-lg-10 col-sm-9 col-md-10 p-0 '>
          <Navbar />
          <Outlet />
          {loading && (
            <div className='d-flex flex-column align-items-center justify-content-center h-75'>
              <div
                className='spinner-border'
                role='status'
              >
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default AppLayout
