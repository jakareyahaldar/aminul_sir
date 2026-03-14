import { Outlet, Navigate } from "react-router-dom"

export default function UserPrivetComponent(){
    const auth = true

    if(auth) return <Outlet />
    if(!auth) return <Navigate to="/un-aprove" />

}