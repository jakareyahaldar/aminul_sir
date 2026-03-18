export default function Filter({ show, config, filter, close }){
  
  if(!show) return null  
  
  return(
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[200px] w-[90%] bg-[#abb1aa] shadow-blue-200 shadow-2xl z-20 p-5 rounded-2xl">
      <i onClick={close} className="absolute right-3 top-3 text-xl fa-solid fa-xmark"></i>
      <h3 className="text-center text-2xl">Filter</h3>
      {
        Object.keys(config).map((key)=>{
          return(
          <div>
            <h4 className="font-bold">{key}</h4>
            <div className="flex gap-2.5 flex-wrap">
              {
              config[key].map((item)=>{
                const active = filter[key]===item.value ? " bg-blue-400" : ""
                return <span onClick={item.action} className={"p-2 py-1 bg-black text-white rounded" + active } >{item.name}</span>
              })
            }
            </div>
          </div>
          )
        })
      }
    </div>
    )
}