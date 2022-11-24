import React,{useContext,useEffect} from 'react'
import { Outlet, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Login from '../../homepage/auth/Login'


export default function SideBar() {
  const state = useContext(GlobalState)
  const [IsAdmin, setIsAdmin] = state.userAPI.IsAdmin

  useEffect(() => {
        const admin = localStorage.getItem("admin")
        console.log(admin)
        if(admin) setIsAdmin(true)
        
  },[])

  if(!IsAdmin) {
    return <Login/>
  } 
  
  return (
    <div className='Page'>
      <div className='SideBar'>
        <h3><Link to = '/dashboard'>Dashboard </Link></h3>
        <h3><Link to = '/dashboard/user'>User</Link> </h3>
        <h3><Link to = '/dashboard/product'>Product</Link></h3>
        <h3><Link to = '/dashboard/category'>Category</Link></h3>
        <h3><Link to = '/dashboard/order'>Order</Link></h3>
      </div>
      <div className='Dasboard_Body'>
        <Outlet></Outlet>
      </div>
    </div>
    
  )
}
