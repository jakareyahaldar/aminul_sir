//import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function StartLoad({ lodding }){
  const Navigate = useNavigate()
  
  
  // if(!lodding){
  //   Navigate("/")
  // }
  
  return(
    <div className=" bg-amber-100 flex justify-center items-center fixed top-0 left-0 py-20 h-full w-full">
      Lodding
    </div>
  )
}