import { useState, useEffect } from "react"

const imageLibrary = [
  {
    text: "আপনার টাইপিং স্পিড ও নির্ভুলতা বাড়ান",
    image: "https://res.cloudinary.com/dzty8nzno/image/upload/v1760705615/u76jxhcezonefyxrv6tx.jpg",
  },
  {
    text: "আপনার টাইপিং স্পিড ও নির্ভুলতা বাড়ান",
    image: "https://res.cloudinary.com/dzty8nzno/image/upload/v1771147085/pttc_official_assets/homepage_sliders/uemosdtmutckwiv1rc8u.jpg",
  },
  {
    text: "Third image",
    image: "https://res.cloudinary.com/dzty8nzno/image/upload/v1760686014/jywcisvdovobzgzbhlnm.png",
  },
  ]

export default function ImageSlider(){
  
  const [index,setIndex] = useState(0)
  
  useEffect(()=>{
    setInterval(()=>{
      setIndex((prevIndex)=>{
        if(prevIndex === imageLibrary.length-1){
          return 0
        }else{
          return prevIndex+1
        }
      })
    },5000)
  },[])
  
  return(
    <>
      <div className="h-[200px] md:h-[400px] relative">
        <img className="fadeIn transition-[1s] object-cover h-full w-full" src={imageLibrary[index].image} alt="image" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%]">
          <p className="font-bold text-white text-center">{imageLibrary[index].text}</p>
          <div className="flex gap-1.5 justify-center">
            
            {
              imageLibrary.map((item, i)=>{
                const w = i === index ? "w-6" : "w-3"
                return <div className={"h-3 transition-[1s] bg-white rounded-full " + w}></div>
              })
            }
          </div>
        </div>
      </div>
    </>
    )
}