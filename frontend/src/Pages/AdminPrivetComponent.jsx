import { Outlet, Navigate } from "react-router-dom"

export default function AdminPrivetComponent(){
    const auth = true

    if(auth) return <Outlet />
    if(!auth) return <Navigate to="/admin-login" />

}