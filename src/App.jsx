
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Home/HomePage'
import Checkout from './Checkout/Checkout'
function App() {
 
  return (
    <div>
      <BrowserRouter>
              <Routes>
                  <Route element={<HomePage/>} path='/'/>
                  <Route element={<Checkout/>} path='/checkout'/>
              </Routes>         
      </BrowserRouter>
      
    </div>
  )
}

export default App
