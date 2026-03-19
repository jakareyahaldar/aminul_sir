import { useNavigate, useLocation } from "react-router-dom"

const video_list = [
  {
    title: "Video 1",
    thamnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAwTaHPQTR2WrEwS57QKrTxEMJO9MpnPwBCtJY2l95w&s=10",
    url : "https://www.youtube.com/embed/vqaS0DgAoGQ?si=HnGPhSfC3TFwkm-d",
    type: "Ms-Word",
    category: "Computer Operation"
  },
  {
    title: "Video 2",
    thamnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAwTaHPQTR2WrEwS57QKrTxEMJO9MpnPwBCtJY2l95w&s=10",
    url : "https://www.youtube.com/embed/vqaS0DgAoGQ?si=HnGPhSfC3TFwkm-d",
    type: "Ms-Word",
    category: "Computer Operation"
  },
  {
    title: "Video 3",
    thamnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAwTaHPQTR2WrEwS57QKrTxEMJO9MpnPwBCtJY2l95w&s=10",
    url : "https://www.youtube.com/embed/vqaS0DgAoGQ?si=HnGPhSfC3TFwkm-d",
    type: "Ms-Word",
    category: "Computer Operation"
  },
  ]


export default function VideoList(){
  return (
    <div className="p-5 grid gap-5 md:grid-cols-2">
      
      {
        video_list.map( v=> <Video data={v} /> )
      }
      
    </div>
    )
}

function Video({data}){
  
  const Navigate = useNavigate()
  
  return(
    <div onClick={()=>Navigate("/video-play",{state:{data}})} className="group rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="h-[200px] relative">
          <img className="h-full w-full object-cover" src={data.thamnail} alt="cc" />
          <p className="absolute top-3 left-3 px-3 py-1 backdrop-blur-3xl bg-black/10 rounded-full text-white border-[1px] border-white font-bold text-xs">{data.type}</p>
          <i className="h-12 w-12 flex justify-center items-center rounded-full bg-white absolute bottom-2 right-2 fa-solid fa-play"></i>
          {/*Hover oveely*/}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity transition-[2s] bg-[#000000a6] absolute top-0 left-0 h-full w-full grid place-items-center">
            <i className="h-12 w-12 flex justify-center items-center rounded-full bg-white fa-solid fa-play"></i>
          </div>
        </div>
        <h3 className="font-bold mx-5 my-5">{data.title}</h3>
        <div className="text-xs px-5 pb-5 flex justify-between items-center">
          <p>{data.category}</p>
          <p>এখন দেখুন</p>
        </div>
      </div>
    )
}