import { Outlet, Navigate } from "react-router-dom"
import NavBar from "../Components/Navbar/Navbar.jsx"
import BottomBar from "../Components/BottomBar.jsx"

import { useSelector } from "react-redux"

export default function AdminPrivetComponent(){
    
   // const { account, isLoading } = useSelector( e => e.auth )
    
    
    //let pass = false
    
    const lcl = window.localStorage.getItem("admntkn")
    const admin = lcl ? JSON.parse(lcl) : null
  
    // if(admin && admin.token && account && account.token){
    //   pass = admin.token === account.token
    // }
    
    const pass = !!admin?.token
    
    if(pass) return ( 
      <>
        <NavBar />
        <BottomBar />
        <Outlet />
      </>
      )
    if(!pass) return <Navigate to="/admin-login" />

}