import { useEffect, useState } from 'react'
import './App.css'
import { Card, Col, Input, Row, Select, Space } from 'antd';

import 'axios'
import axios from 'axios';
import Meta from 'antd/es/card/Meta';
function App() {
  const [Product,setProduct]=useState([])
  const [loading,setLoading]=useState(true)
  const { Search } = Input;
  const [filterCat,setFilterCat]=useState('all');
  const [ProSearch,SetProSearch]=useState("");

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



  return (
    <>
    <div>
      <Search placeholder="input search text"  value={ProSearch} onChange={e=>SetProSearch(e.target.value)} style={{ width: 200 }} />
      <Select
      defaultValue="all"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'all', label: 'All' },
        { value: "men's clothing", label: 'Men' },
      ]}
    />
    </div>
      
    {loading?(
      <p>Loading Product...</p>
    )
    :
    (
    <div >
    <Row  >
      {filterPro.map((item,index)=>(
      <Col className=' flex justify-center items-center' key={index} xs={24} sm={12} md={8} lg={6}>
        <Card
        
          hoverable
          style={{ width: 280 }}
          cover={<img alt="example" src={item.image} />}
          >
          <Meta title={item.title} description={item.description}  />
         <b>${item.price}</b>
        </Card>
      </Col>
      ))}

    </Row>
    </div>

    )
    }
    </>
  )
}

export default App
