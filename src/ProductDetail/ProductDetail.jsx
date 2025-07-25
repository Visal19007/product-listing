import { Alert, Snackbar } from '@mui/material'
import { Button, Card, Col } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Meta from 'antd/es/card/Meta';
import {useParams } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

function ProductDetail() {
    const {id}=useParams()
    const [product,setProduct]=useState([])
    const [qty,setQty]=useState(1)
    const [alert,setAlert]=useState(false)
    const cart=useCartStore(state=>state.cart)
    const addToCart=useCartStore(state=>state.addtoCart)
      const increaseQty=useCartStore(state=>state.increaseQty)
    const decreaseQty=useCartStore(state=>state.decreaseQty)
    

    useEffect(()=>{
            axios.get(`https://fakestoreapi.com/products/${id}`)
    .then(res=>{
        setProduct(res.data)

        // console.log(res.data)
    }).catch(res=>{
        console.log(res.error)
    })
    },[])
    // const productId=product.filter(item=>item.id==id)

    
     const handleClose=()=>{
      
      setAlert(false)
      
    }
  return (
    <div className='mt-30'>
      
        <b>Produt Detail{product.id}</b>
        <div className='mt-10'>
                <Card 
                hoverable
                cover={<img  alt={product.title} src={product.image} style={{width:"100%", height: 250, objectFit: 'contain' }} />}
                >
                <Meta title={product.title} description={`$${product.price}`} />
                <div className='justify-between mt-5'>
                    <Button onClick={() => {increaseQty(product);qty>1?setQty(qty-1):1}}>-</Button>
                    {qty}
                    <Button onClick={()=>{decreaseQty(product.id);setQty(qty+1)}}>+</Button>
                </div>
                <Button className='mt-4' onClick={()=>{addToCart(product,qty);setAlert(true)}}>
                    Adde to Cart
                </Button>
                {/* {date} */}

                    <Snackbar open={alert} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Added to Cart
                        </Alert>
                    </Snackbar>
                </Card>
        </div>
      
    </div>
  )
}

export default ProductDetail
