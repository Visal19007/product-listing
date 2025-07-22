import { Button, Card, Col, Input, List, Pagination, Row, Select, Skeleton, Space } from 'antd';
import 'axios'
import axios from 'axios';
import Meta from 'antd/es/card/Meta';
import { useCartStore } from '../store/useCartStore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Snackbar } from '@mui/material';
import { useFilterStore } from '../store/useFilterStore';
function HomePage() {
     const [Product,setProduct]=useState([])
  const [loading,setLoading]=useState(true)
 const [alert,setAlert]=useState(false)
  const cart=useCartStore(state=>state.cart)
  const decreaseQty=useCartStore(state=>state.decreaseQty)
  const increaseQty=useCartStore(state=>state.increaseQty)
  const removeFromCart=useCartStore(state=>state.removeCart)
  const searchCart=useCartStore(state=>state.search)
  const setCategory=useFilterStore(state=>state.setCategory)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products")
    .then(res=>{
      // console.log(res.data)
      setProduct(res.data)
      setTimeout(()=>{
        setLoading(false)
      },500)
      
    }).catch(res=>{
      console.log(res.error)
      setLoading(false)
    })
  },[])
  


  const category=useFilterStore(state=>state.category)
  const filterPro = category === "all" // if select still defaulvalue or eqaul all
  ? searchCart.trim() === "" ?Product : Product.filter(product=>product.title.toLowerCase().includes(searchCart.toLowerCase()))  //true: check if Prosearch = empty just get Product else Product filter by searching
  : searchCart.trim() === "" // else: check if Prosearch = empty 
    ? Product.filter(product => product.category === category) //Product filter by select category
    : Product.filter(product => // if Prosearch is not equal empty
        product.category === category && // Product filter by select category
        product.title.toLowerCase().includes(searchCart.toLowerCase()) // and search by title also
      );
      const paginatedProducts = filterPro.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
    const handleClose=()=>{
      
      setAlert(false)
      
    }

  const addToCart=useCartStore(state=>state.addtoCart);
  const totalprice=cart.reduce((sum,item)=>sum+item.price*item.qty,0)
  const totalqty=cart.reduce((sum,item)=>sum+item.qty,0)
  return (
    <div>
        <div className='mt-30 flex justify-end'>
      {/* <Search placeholder="input search text"  value={ProSearch} onChange={e=>SetProSearch(e.target.value)} style={{ width: 200 }} /> */}
      <Select
      
      defaultValue="all"
      style={{ width: 120 }}
      onChange={setCategory}
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
      // <p>Loading Product...</p>
        Array.from({ length: filterPro.length }).map((_, i) => (
      <Row key={i} gutter={[16, 16]} className='mt-10'>
        {paginatedProducts?.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card>
            <Skeleton.Button
              active
              shape="default"
              block
              style={{
                height: 250,
                borderRadius: 8,
              }}
            />
              <Skeleton className='mt-3' paragraph={2} active title={false} />
             
              <Skeleton.Button style={{height:30,width:100}} active className='mt-2' />
            </Card>
          </Col>
        ))}
      </Row>
    
  ))
      
    )
    :
    (
    <div className='mt-10'>
      {filterPro.length>0?
      <Row gutter={[16, 16]}>
        {paginatedProducts?.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<Link to={`/product/${product.id}`}><img  alt={product.title} src={product.image} style={{width:"100%", height: 250, objectFit: 'contain' }} /></Link>}
            >
              <Meta title={product.title} description={`$${product.price}`} />
              <Button className='mt-4' onClick={()=>{addToCart(product);setAlert(true)}}>
                Adde to Cart
              </Button>
       <Snackbar open={alert} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Added to Cart
        </Alert>
      </Snackbar>
            </Card>
          </Col>
        ))}
      </Row>
      : <p className='text-center'>empty Product...</p> }
    </div>
    
    )
    }
    
          {/* <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filterPro.length}
            onChange={page => setCurrentPage(page)}
            className="text-center mt-4"
          /> */}
          <br />
           <Pagination align='end' current={currentPage} pageSize={itemsPerPage}  onChange={page=>setCurrentPage(page)} total={filterPro.length} />

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
                    {}
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
     <h1 className='mt-10 p-10'>Total: <b>${totalprice.toFixed(2)}</b> </h1>
     <div className='flex items-center justify-center p-10'><Button  type='primary'><Link to='/checkout'>Go to Checkout</Link></Button></div>

    </div>
    
  )
}

export default HomePage
