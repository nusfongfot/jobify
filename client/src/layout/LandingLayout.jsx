import { useLoading } from '../context/loadingContext'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function LandingLayout() {
  const { loading } = useLoading()

  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      {loading ? (
        <div
          className='spinner-border'
          role='status'
        ></div>
      ) : (
        <Outlet />
      )}
      <ToastContainer />
    </div>
  )
}
export default LandingLayout
