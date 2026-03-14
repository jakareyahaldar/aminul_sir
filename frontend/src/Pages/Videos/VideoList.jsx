export default function VideoList(){
  return (
    <div className="p-5 grid gap-5 md:grid-cols-2">
      
      <Video />
      <Video />
      <Video />
      <Video />
      
    </div>
    )
}

function Video(){
  return(
    <div className="group rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="h-[200px] relative">
          <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCAwTaHPQTR2WrEwS57QKrTxEMJO9MpnPwBCtJY2l95w&s=10" alt="cc" />
          <p className="absolute top-3 left-3 px-3 py-1 backdrop-blur-3xl bg-black/10 rounded-full text-white border-[1px] border-white font-bold text-xs">MS WORD</p>
          <i className="h-12 w-12 flex justify-center items-center rounded-full bg-white absolute bottom-2 right-2 fa-solid fa-play"></i>
          {/*Hover oveely*/}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity transition-[2s] bg-[#000000a6] absolute top-0 left-0 h-full w-full grid place-items-center">
            <i className="h-12 w-12 flex justify-center items-center rounded-full bg-white fa-solid fa-play"></i>
          </div>
        </div>
        <h3 className="font-bold mx-5 my-5">Ms Word-3</h3>
        <div className="text-xs px-5 pb-5 flex justify-between items-center">
          <p>কম্পিউটার অপারেশন</p>
          <p>এখন দেখুন</p>
        </div>
      </div>
    )
}