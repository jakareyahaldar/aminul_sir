
import BackAndTitle from "../../Components/BackAndTitle.jsx"
import VideoList from "./VideoList.jsx"

export default function Videos(){
  return(
    <>
      <div className="py-16">
        
        {/*TitleAndBack*/}
        <BackAndTitle path="/" title="ভিডিও টিউটোরিয়াল" />
        <VideoList />
      </div>
    </>
    )
}