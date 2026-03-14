import AmaderSeba from "./Seba/AmaderSeba.jsx"
import BrakingNews from "./BrekingNews.jsx"
import ImageSlider from './ImageSlider/ImageSlider.jsx'

export default function Home(){
  return(
    <>
      <div className="pt-16 pb-24">
        <BrakingNews />
        <ImageSlider />
        {/*Amader seba*/}
        <AmaderSeba />
        
      </div>
    </>
    )
}



//fa-solid fa-file-pdf