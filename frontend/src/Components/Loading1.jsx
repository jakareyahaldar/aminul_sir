import loadGif from "../assets/loading.gif"

export default function Loading1({on}){
  if(!on) return null
  return(
    <div className=" z-50 h-dvh w-screen fixed top-0 left-0 grid place-items-center bg-[#000000b3]">
      <img className="w-[200px] h-[200px] rounded-3xl" src={loadGif} alt="loading"/>
    </div>
    )
}