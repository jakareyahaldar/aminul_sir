import { Outlet, Navigate } from "react-router-dom"

export default function AdminPrivetComponent(){
    
    const lcl = window.localStorage.getItem("admntkn")
    const adimn = lcl ? JSON.parse(lcl) : null
  
    const auth = adimn?.token

    if(auth) return <Outlet />
    if(!auth) return <Navigate to="/admin-login" />

}