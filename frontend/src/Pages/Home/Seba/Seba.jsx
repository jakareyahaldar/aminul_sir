import {Link} from "react-router-dom"

export default function Seba({ icon, label, path }){
  return(
    <Link to={path}>
      <div className="  flex flex-col items-center gap-1.5 w-20">
      <i className={"h-16 w-16 bg-[#14b8a6] rounded-2xl flex justify-center items-center text-xl " + icon}></i>
      <p className="text-xs text-center font-bold">{label}</p>
    </div>
    </Link>
    )
}