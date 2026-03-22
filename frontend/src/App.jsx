import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"

//import BottomBar from "./Components/BottomBar.jsx"
//import NavBar from "./Components/Navbar/Navbar.jsx"
import Home from "./Pages/Home/Home.jsx"
import PdfBoi from "./Pages/PdfBoi/PdfBoi.jsx"
import Videos from "./Pages/Videos/Videos.jsx"
import AdminLogin from "./Pages/Auth/AdminLogin.jsx"
import UserAuth from "./Pages/Auth/UserAuth.jsx"
import AdminDashBoard from "./Pages/Admin/Dashboard.jsx"
import UserManager from "./Pages/Admin/UserManager/UserManager.jsx"
import AddBook from "./Pages/Admin/BookManager/AddBook.jsx"
import AdminPdfBook from "./Pages/Admin/BookManager/PdfBoi.jsx"

import PlayVideo from "./Pages/Videos/Play.jsx"
import Exams from "./Pages/Exams/Exams.jsx"
import ExamManager from "./Pages/Admin/ExamManager/ExamManager.jsx"
import ImageSliderManager from "./Pages/Admin/ImageSlider/ImageSlider.jsx"
import NotFound from "./Components/NotFound.jsx"
import VideoManager from "./Pages/Admin/VideoManager/VideoManager.jsx"
import Notice from "./Pages/Notice/Notice.jsx"
import NoticeManager from "./Pages/Admin/Notice/NoticeManager.jsx"
import NoticeOpen from "./Pages/Notice/OpenNotice.jsx"
import Profile from "./Pages/Profile/Profile.jsx"
import BlodDonar from "./Pages/Blod/BlodDonar.jsx"

// Privet components 
import AdminPrivetComponent from "./Pages/AdminPrivetComponent.jsx"
import UnAprove from "./Components/UnAprove.jsx"
import UserPrivetComponent from "./Pages/UserPrivetComponent.jsx"

import { useSelector, useDispatch } from "react-redux"
import { GetAccount } from "./feature/auth/authSlice.js"
import { GetBooks } from "./feature/books/booksSlice.js"
import { GetExams } from "./feature/exams/examSlice.js"
import { GetSlider } from "./feature/slider/sliderSlice.js"
import { GetVideos } from "./feature/videos/videoSlice.js"
import { GetNotice } from "./feature/notice/noticeSlice.js"

function App() {
  
  
  //const Navigate = useNavigate()
   const dispatch = useDispatch()
  // const authState = useSelector(e => e.auth)
  
  // console.log(authState)
  
  useEffect(()=>{
    dispatch(GetAccount())
    dispatch(GetBooks())
    dispatch(GetExams())
    dispatch(GetSlider())
    dispatch(GetVideos())
    dispatch(GetNotice())
  },[])
  
  
  // if(authState.isLoading){
  //   return (
  //     <div className="h-full w-full fixed top-0 left-0 flex justify-center items-center">
  //       Loading
  //     </div>
  //     )
  // }
  
  
  
  return (
    <>
      <BrowserRouter>
        
        <Routes>

          
          {/*User Privet Routes */}
          <Route element={<UserPrivetComponent />} >
            {UserScope()}
          </Route>
          {/*Admin Privet Routes */}
          <Route element={<AdminPrivetComponent />} >
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/users" element={<UserManager />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/admin/pdf-book" element={<AdminPdfBook />} />
            <Route path="/admin/slider-manage" element={<ImageSliderManager />} />
            <Route path="/admin/exams" element={<ExamManager />} />
            <Route path="/video-manager" element={<VideoManager />} />
            <Route path="/admin/notice" element={<NoticeManager />} />
          </Route>

          
          <Route path="/login" element={<UserAuth />} />
          <Route path="/un-aprove" element={<UnAprove />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/video-play" element={<PlayVideo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


function UserScope(){
  return(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/pdf-books" element={<PdfBoi />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/assessment" element={<Exams />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/notice/:_id" element={<NoticeOpen />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/blod" element={<BlodDonar />} />
    </>
    )
}
