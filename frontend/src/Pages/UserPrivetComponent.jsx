import { Outlet, Navigate } from "react-router-dom"
import NavBar from "../Components/Navbar/Navbar.jsx"
import BottomBar from "../Components/BottomBar.jsx"

import { useSelector } from "react-redux"

export default function UserPrivetComponent(){
    
    
    
    const { account, isLoading } = useSelector( e => e.auth )
    
    
    // admin check
    let admin_pass = false
    const admin_lcl = window.localStorage.getItem("admntkn")
    const admin = admin_lcl ? JSON.parse(admin_lcl) : null
    // if(admin && admin.token && account && account.token){
    //   admin_pass = admin.token === account.token
    // }
    
    // console.log(account,admin_pass)
    // user check
    const lcl = window.localStorage.getItem("user_data")
    const local_user = lcl ? JSON.parse(lcl) : null
  
    const logedin = local_user?.token
    const userAproved = local_user?.isAprove
    
    const allOk = !!admin?.token || userAproved

    if(allOk) return (
      <>
         <NavBar />
         <BottomBar />
         <Outlet />
      </>
      )
    if(!logedin) return <Navigate to="/login" />
    if(!userAproved) return <Navigate to="/un-aprove" />

}