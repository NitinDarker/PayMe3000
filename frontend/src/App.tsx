import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from '@/components/pages/Landing'
import Signup from '@/components/pages/Signup'
import Signin from '@/components/pages/Signin'
import Dashboard from '@/components/pages/Dashboard'
import Transactions from '@/components/pages/Transactions'
import ProtectedRoute from '@/lib/ProtectedRoute'

function App () {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
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
          <Route
            path='/transactions'
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
