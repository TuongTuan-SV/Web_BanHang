import React, { useContext } from 'react'
import './admin.css'
import {Routes, Route} from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import Dashboard from './dashboard/Dashboard'
import Product from './product/Product'
import CreateProduct from './product/createProduct/CreateProduct'
import Category from './category/Category'
import Order from './order/Order'
import DetailProduct from './product/ViewDetail/DetailProduct'
import EditProduct from './product/editProduct/EditProduct'
import NotFound from '../homepage/utils/NotFound'

export default function Admin() {
  
  return (
    <div className='admin_page'>
      <Routes>
        <Route element = {<SideBar/>}>
            <Route path='/dashboard'  element = {<Dashboard/>}></Route>
            <Route path='dashboard/user'  element = {<Dashboard/>}></Route>
            <Route path='dashboard/product' element = {<Product/>}></Route>
            <Route path='dashboard/product/createproduct'exact element = {<CreateProduct/>}></Route>
            <Route path='dashboard/product/editproduct' exact element = {<EditProduct/>}></Route>
            <Route path='dashboard/category'exact element = {<Category/>}></Route>
            <Route path='dashboard/order'exact element = {<Order/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}
