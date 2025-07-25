import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Home/HomePage'
import Checkout from './Checkout/Checkout'
import SuccessPage from './Success/SuccessPage'
import Nav from './Navbar/Nav'
import ProductDetail from './ProductDetail/ProductDetail'
import OrderHistoryPage from './OrderHistory/OrderHistoryPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  element={<Nav/>} >
          <Route path="/" element={<HomePage />}  />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<SuccessPage/>} />
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/orderhistory' element={<OrderHistoryPage/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
