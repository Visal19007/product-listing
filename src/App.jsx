import { use, useEffect, useState } from 'react'
import './App.css'
import { Button, Card, Col, Input, List, Row, Select, Space } from 'antd';

import 'axios'
import axios from 'axios';
import Meta from 'antd/es/card/Meta';
import { useCartStore } from './store/useCartStore';
function App() {
  const [Product,setProduct]=useState([])
  const [loading,setLoading]=useState(true)
  const { Search } = Input;
  const [filterCat,setFilterCat]=useState('all');
  const [ProSearch,SetProSearch]=useState("");

  const cart=useCartStore(state=>state.cart)
  const decreaseQty=useCartStore(state=>state.decreaseQty)
  const increaseQty=useCartStore(state=>state.increaseQty)
  const removeFromCart=useCartStore(state=>state.removeCart)
  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products")
    .then(res=>{
      console.log(res.data)
      setProduct(res.data)
      setLoading(false)
    }).catch(res=>{
      console.log(res.error)
      setLoading(false)
    })
  },[])
  


  
  const filterPro = filterCat === "all" // if select still defaulvalue or eqaul all
  ? ProSearch.trim() === "" ?Product : Product.filter(product=>product.title.toLowerCase().includes(ProSearch.toLowerCase()))  //true: check if Prosearch = empty just get Product else Product filter by searching
  : ProSearch.trim() === "" // else: check if Prosearch = empty 
    ? Product.filter(product => product.category === filterCat) //Product filter by select category
    : Product.filter(product => // if Prosearch is not equal empty
        product.category === filterCat && // Product filter by select category
        product.title.toLowerCase().includes(ProSearch.toLowerCase()) // and search by title also
      );
  const handleChange=(value)=>{
    setFilterCat(value);
  }

  const addToCart=useCartStore(state=>state.addtoCart);
  const totalprice=cart.reduce((sum,item)=>sum+item.price*item.qty,0)
  const totalqty=cart.reduce((sum,item)=>sum+item.qty,0)
  return (
    <>
    <div className='mt-10 flex justify-between'>
      <Search placeholder="input search text"  value={ProSearch} onChange={e=>SetProSearch(e.target.value)} style={{ width: 200 }} />
      <Select
      defaultValue="all"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'all', label: 'All' },
        { value: "men's clothing", label: 'Men' },
        { value:"electronics",label:'Electronics'},
        { value:"jewelery",label:"jewelery"},
        { value:"women's clothing",label:"Women"}
      ]}
    />
    </div>
      
    {loading?(
      <p>Loading Product...</p>
    )
    :
    (
    <div className='mt-10'>
      <Row gutter={[16, 16]}>
        {filterPro.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={product.title} src={product.image} style={{ height: 250, objectFit: 'contain' }} />}
            >
              <Meta title={product.title} description={`$${product.price}`} />
              <Button className='mt-4' onClick={()=>addToCart(product)}>
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
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
