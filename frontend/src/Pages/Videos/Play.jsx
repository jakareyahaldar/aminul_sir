import { useRef } from "react"
import BackAndTitle from "../../Components/BackAndTitle.jsx"
import { useLocation } from "react-router-dom"

export default function Play(){
  
  const playerEl = useRef(null)
  
  const location = useLocation()
  const { data } = location.state
  
  return(
    <div className="w-full h-dvh">
      <BackAndTitle path="/videos" title={data.title} />
      <div ref={playerEl} className="px-5 pb-10 h-full">
        <iframe class="w-full h-full rounded-2xl mt-10" src={data.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
    )
}