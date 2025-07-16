import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Home/HomePage'
import Checkout from './Checkout/Checkout'
import SuccessPage from './Success/SuccessPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomePage />}  />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<SuccessPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
