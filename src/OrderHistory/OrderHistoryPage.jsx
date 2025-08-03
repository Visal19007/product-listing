import { Button, Image, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useHistoryStore } from '../store/useHistoryStore';
import { Link } from 'react-router-dom';

function OrderHistoryPage() {
const orderHistory=useHistoryStore(state=>state.orderHistory)

const [history,setHistory]=useState([])
useEffect(()=>{
  setHistory(orderHistory)
},[])

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render:(image)=>
      <Image width={50} height={70} className=' rounded-full ' src={image} alt="" />
    
  },
  {
    title: 'DateTime',
    dataIndex: 'datetime',
    key: 'datetime',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render:(total)=><span className='text-red-500 font-bold'>${total}</span>
  },
  {
    title: 'Action',
    render:(order)=> <Link to={`/product/${order.id}`}><Button type='primary' >View Detail</Button></Link>

  }
];

  return (
    <div className='mt-30 p-5'>
      <b>Order History</b>  
    <Table className='mt-10'  dataSource={orderHistory} rowKey={'id'}  columns={columns} />

    
    </div>
  )
}

export default OrderHistoryPage
