import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Card } from './components/ui/card'
import Signup from './components/pages/Signup'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Card />} />
          <Route path='/dashboard' element={<Card />} />
          <Route path='/send' element={<Card />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
