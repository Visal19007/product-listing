
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

    <h2 className='mt-5'>🛒 Cart {totalqty} item{totalqty > 1 ? "s" : ""}</h2>
    {cart?
    
    <List
      dataSource={cart}
      renderItem={item=>(
          <div>
                <div className='mt-10 flex items-center justify-between ' key={item.id} >

                  <img width={100} src={item.image} alt={item.image} />
                  <strong>{item.title}</strong>  ${item.price} x {item.qty}
                  <div className='justify-between'>
                    <Button onClick={() => decreaseQty(item.id)}>-</Button>
                    <Button onClick={() => increaseQty(item.id)}>+</Button>
                    
                  </div>
                  <Button danger onClick={() => removeFromCart(item.id)}>Remove</Button>
                </div>
          </div>
          
      
      )}
    
    />
    :
    <p>Your cart is empty. Start shopping now!</p>
    
    }
     <h1 className='mt-10'>Total:{totalprice.toFixed(2)}</h1>


 

    </>

  )
}

export default App
