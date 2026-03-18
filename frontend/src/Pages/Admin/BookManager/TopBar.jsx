import { useNavigate } from "react-router-dom"

export default function TopBar({filterAction}){
  
  const Navigate = useNavigate()
  
  return(
    <>
      <div className="flex justify-between items-center px-5 py-3 shadow-md gap-5">
        <i onClick={()=>Navigate("/")} className="text-xl fas fa-chevron-left"></i>
        <div className="flex gap-2.5 items-center">
          
          {/*Search box*/}
          <div className="flex gap-2.5 items-center bg-[#b8d3dd] rounded-2xl p-3">
            <i className="fas fa-search"></i>
            <input className="bg-transparent outline-0" placeholder="বই বা শিট খুঁজুন" />
          </div>
          <i onClick={filterAction} className="flex justify-center items-center h-12 w-12 rounded-xl bg-black text-white text-xl fa-solid fa-filter"></i>
        </div>
      </div>
    </>
    )
}