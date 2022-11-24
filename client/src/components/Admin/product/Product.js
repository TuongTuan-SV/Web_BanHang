import React, {useContext, useEffect, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import axios from 'axios'

// const initialState = {
//         product_id : '',
//         title : '',
//         price : 0,
//         description : '',
//         brand : '',
//         category : '',
//         difficulty: '',
//         dimensions : '',
//         players : '',    
//     }

export default function OrderDetail() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productAPI.products
    const [categories] = state.categoryAPI.categories
    const [image, setImage] = useState(false)
    const [token] = state.token
    const [check, setCheck] = useState(false)
    // const [loading, setloading]
    
    // console.log(products)
    const CheckAll = () =>{
        products.forEach(async product => {
            product.checked = true
            await axios.put(`/api/products/${product._id}`, product,{
                headers : {Authorization : token}
            })
        })
        setCheck(!check)
    }
    const ClickUdate = async (item)=>{
            item.checked = !item.checked
            await axios.put(`/api/products/${item._id}`, item,{
                headers : {Authorization : token}
            })
            console.log(item.checked)
            setCheck(!check)
    }
    useEffect(()=>{
       
    },[check])
    
  return (
    <div className='History_Page'>
        <div className='dashboard_btn'>
            <h3><button><Link to = '/dashboard/product/createproduct'>Create Product</Link></button></h3>
            <h3><button><Link to = '/dashboard/product/edit'>Edit Product</Link></button></h3>
            <h3><button>Delete Product</button></h3>
        </div>
        
         <table>
            <thead>
                <tr>
                    <th><input type="checkbox" className='checkall' onChange={CheckAll}></input></th>
                    <th></th>
                    <th>Product_id</th>
                    <th>Title</th>
                    {/* <th>Description</th> */}
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Sold</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(item => (
                            <tr key = {item._id}>
                                <td><input type="checkbox" checked = {item.checked} onChange={()=> ClickUdate(item)}></input></td>
                                <td><img src = {item.image.url} alt = " "/></td>
                                <td>{item.product_id}</td>
                                <td>{item.title}</td>
                                {/* <td style={{maxWidth : '70px', maxHeight : '100px', overflow : 'scroll',whiteSpace : 'nowrap'}}>{item.description}</td> */}
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>{item.difficulty}</td>
                                <td>{item.sold}</td>
                                <td>{item.price .toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>   
                                <td><Link to = '/dashboard/product/editproduct'>edit</Link></td>

                            </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}
