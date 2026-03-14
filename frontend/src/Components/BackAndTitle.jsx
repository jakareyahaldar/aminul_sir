import { useNavigate } from "react-router-dom"

export default function BackAndTitle({path,title}){
  const Navigate = useNavigate()
  
  return(
    <div className="my-3 px-5 py-2 flex gap-5 items-center">
          <i onClick={()=>Navigate(path)} className="text-xl fa-solid fa-arrow-left"></i>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
    )
}