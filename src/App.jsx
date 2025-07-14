import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Home/HomePage'
import Checkout from './Checkout/Checkout'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}  />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
