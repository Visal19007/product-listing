import { Button, Image, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useHistoryStore } from '../store/useHistoryStore';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';

function OrderHistoryPage() {
const orderHistory=useHistoryStore(state=>state.orderHistory)
const [history,setHistory]=useState([])
const [filtered, setFiltered] = useState(orderHistory);
const total=history.reduce((sum,order)=>sum+order.total,0)
const orderItems=history.reduce((sum,order)=>sum+order.qty,0)
const { RangePicker } = DatePicker;

// const handleDateFilter=(dates)=>{
//   if(!dates || dates.length===0){
//     setFiltered(orderHistory); // Reset to full list
//     return;
//   }
//   const [start,end]=dates;
//   const filtered =orderHistory.filter(order=>{
//     const orderDate=new Date(order.datetime);
//     return orderDate>=start.toDate() && orderDate<=end.toDate();
//   })
//   setFiltered(filtered);
// }
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const handleDateFilter=(dates)=>{
  if(!dates || !startDate){
    setFiltered(orderHistory); // Reset to full list
    return;
  }
  // const [start,end]=dates;
  // setEndDate(dates);
  const filtered =orderHistory.filter(order=>{
    const orderDate=new Date(order.datetime);
    return orderDate>=startDate.toDate() && orderDate<=dates.toDate();
  })
  setFiltered(filtered);
}

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
      <div className='flex justify-between items-center mb-5'>
      <b>Order History</b>  
     <div className='flex gap-2'>
       {/* <RangePicker onChange={dates=>handleDateFilter(dates)} /> */}
      <DatePicker onChange={date=>{handleDateFilter(date),setStartDate(date)}} />
      <DatePicker  onChange={dates=>{handleDateFilter(dates),setEndDate(dates)}}/>
     </div>
      
      </div>
    <Table className='mt-10' pagination={{pageSize:5}} dataSource={filtered} rowKey={'id'}  columns={columns} />

    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-5">
      <h2 className="text-xl font-bold mb-2">Order Summary</h2>
      <p>🧾 Total Orders: {history.length}</p>
      <p>💸 Total Spent: ${total}</p>
      <p>🛍️ Total Items: {orderItems}</p>
    </div>
    </div>
  )
}

export default OrderHistoryPage
