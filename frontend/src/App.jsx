import { BrowserRouter, Routes, Route } from "react-router-dom"

import BottomBar from "./Components/BottomBar.jsx"
import NavBar from "./Components/Navbar/Navbar.jsx"
import Home from "./Pages/Home/Home.jsx"
import PdfBoi from "./Pages/PdfBoi/PdfBoi.jsx"
import Videos from "./Pages/Videos/Videos.jsx"
import AdminLogin from "./Pages/Auth/AdminLogin.jsx"
import UserAuth from "./Pages/Auth/UserAuth.jsx"
import AdminDashBoard from "./Pages/Admin/Dashboard.jsx"


// Privet components 
import AdminPrivetComponent from "./Pages/AdminPrivetComponent.jsx"
import UnAprove from "./Components/UnAprove.jsx"
import UserPrivetComponent from "./Pages/UserPrivetComponent.jsx"


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <BottomBar />
        <Routes>

          {/*Admin Privet Routes */}
          <Route element={<AdminPrivetComponent />} >
            <Route path="/admin" element={<AdminDashBoard />} />
          </Route>
          {/*User Privet Routes */}
          <Route element={<UserPrivetComponent />} >
            <Route path="/" element={<Home />} />
            <Route path="/pdf-books" element={<PdfBoi />} />
            <Route path="/videos" element={<Videos />} />
            
          </Route>

          
          <Route path="/login" element={<UserAuth />} />
          <Route path="/un-aprove" element={<UnAprove />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
