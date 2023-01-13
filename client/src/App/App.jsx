import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { AuthContextProvider } from '../context/authContext'
import LoadingContextProvider from '../context/loadingContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <LoadingContextProvider>
          <Router />
        </LoadingContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
