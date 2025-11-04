import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Card } from './components/ui/card'
import Signup from './components/pages/Signup'
import Signin from './components/pages/Signin'
import Dashboard from './components/pages/Dashboard'
import ProtectedRoute from './lib/protectedRoute'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/send' element={<Card />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
