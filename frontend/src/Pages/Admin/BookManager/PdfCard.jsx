import {useNavigate} from "react-router-dom"

import ImageObj from "../../../utilities/placeImage.js"

export default function PdfCard({data}) {
  const API = import.meta.env.VITE_API_URL
  const Navigate = useNavigate()
  
  
  async function HandleDelete(){
    try{
      const id = data._id
      if(!id) throw Error("Id not found")
      const req = await fetch( API+"/book/"+id+"/delete",{method:"delete"} )
      const res = await req.json()
      if(req.ok){
        window.location.reload()
      }else{
        throw Error(res.message)
      }
    }catch(message){alert(message)}
  }
  
  
  return(
    <div key={data?._id} className="grid shadow-2xl px-3 py-1 rounded-2xl border-[1px] hover:border-black transition-[1s]">

     <div className="flex gap-2 items-center">
        {/*pdf||book Image*/}
      <div className="relative w-20 h-20">
        <img className="w-full h-full object-cover" src={ImageObj[data.file_type]} alt={data.title} />
      <span className="absolute bottom-1 right-1 p-1 rounded-md bg-black text-white text-xs">{data.size}MB</span>
    </div>
    {/*Details*/}
    <div>
      <p className="text-xs font-bold text-[#287b68]">
        Level-{data?.level}
      </p>
      <div className="mt-2">
        <p className="font-bold text-sm">
          {data?.title}
        </p>
        <p className="text-xs text-[#287b68]">
          {data?.category}
        </p>
      </div>
    </div>
     </div>

    <div className="flex justify-end gap-2.5">
      <button onClick={HandleDelete} className="p-3 py-1 bg-blue-500 rounded-md" >Delete</button>
      <button onClick={()=>Navigate("/add-book",{state:{data}})} className="p-3 py-1 bg-blue-500 rounded-md" >Edit</button>
    </div>
    
  </div>
)
}