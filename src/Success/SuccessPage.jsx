import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

function SuccessPage() {
    const ordered=useCartStore(state=>state.setJustordered)
    useEffect(()=>{
        ordered(false)
        sessionStorage.removeItem("ordered")
    },[])
  return (
    <div className='mt-20'>
      <p>🎉 Thank you for your order!</p>
      <Link to='/'><Button>Back to Home</Button></Link>
    </div>
  )
}

export default SuccessPage
