import { useSelector } from "react-redux"
import { useRef } from "react"

export default function BrekingNews(){
  
  const scrlEl = useRef(0)
  
  const { notices } = useSelector(e=>e.notice)
  const notice = notices.find(n=> !!n.breaking )
  
  const speed = notice ? notice.description.length/4 : 10
  if(scrlEl.current){
    scrlEl.current.style.animationDuration = speed+"s"
  }
  
  return(
    <div className="flex w-full" >
        <div className=" font-bold text-sm px-3 py-2 bg-[#437143] text-white shrink-0 flex items-center gap-1">
          <div className="h-3 w-3 bg-white animate-pulse rounded-full"></div>
          ব্রেকিং নিউজ
        </div>
        <div className="bg-amber-200 overflow-hidden flex items-center w-full">
          <p ref={scrlEl} className="breakingAnimate whitespace-nowrap">
            {notice?.description}
          </p>
        </div>
      </div>
    )
}