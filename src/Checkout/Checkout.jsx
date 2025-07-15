import React, { useState } from 'react'
import { useCartStore } from '../store/useCartStore'
import { Avatar, Button, Divider, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Checkout() {
    const cart=useCartStore(state=>state.cart)
    const clear=useCartStore(state=>state.clearCart)
    const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0)
    const [alert,setAlert]=useState(false)
    const navigate=useNavigate();
    const handlePlaceOrder=()=>{
    setAlert(true)
    clear();//🧹 clears Zustand + localStorage automatically
  
    }
    const handleClose=()=>{
      
      setAlert(false)
      navigate('/')
      
      
    }

  return (
    <div>
       <Snackbar open={alert} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          🎉 Thank you for your order!
        </Alert>
      </Snackbar>
      <p className='text-center mt-5 text-2xl'>Checkout</p>
        <div
          id="scrollableDiv"
          style={{
            height: 200,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
          className='mt-10'
        >
          
          <InfiniteScroll
            dataLength={cart.length}
            // next={cart}
            // hasMore={cart.length < 3}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={cart}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.title}
                    description={item.qty}
                  />
                  <div>$<b>{item.price}</b> </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        <div className='mt-5 flex justify-between p-3'>
          
            <b>Total: ${total.toFixed(2)}</b> <br />
            <Button  type='primary' onClick={handlePlaceOrder}>Place Order</Button>
            
        </div>
    </div>
    

    
  )
}

export default Checkout
