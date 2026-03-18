import { Link } from "react-router-dom"
import { useState } from "react"

import TopBar from "./TopBar.jsx"
import PdfList from "./PdfList.jsx"
import Filter from "../../../Components/Filter.jsx"
import { useSelector } from "react-redux"


export default function PdfBoi(){
  const books = useSelector(s =>s.books.books)
  
  const [ showFilter, setShow ] = useState(false)
  const [filterRes,setFilter] = useState({})
  
  const filteredBooks = books.filter((book)=>{
    const allpass = Object.keys(filterRes).every((type)=>{
      if(!filterRes[type]) return true
      return book[type]===filterRes[type]
    })
    return allpass
  })
  
  
  function update_filterData(key,val){
    return setFilter(()=>{
          if(filterRes[key]===val){
            return {...filterRes,[key]:null}
          }else{
            return {...filterRes,[key]:val}
          }
        })
  }
  const filter_config = {
    level: [
      {
        name: "Level-1",
        value: "1",
        action: ()=> update_filterData("level","1")
      },
      {
        name: "Level-2",
        value: "2",
        action: ()=>update_filterData("level","2")
      },
      {
        name: "Level-3",
        value: "3",
        action: ()=>update_filterData("level","3")
      },]
  }
  
  function toggleFilter(){
    setShow(!showFilter)
  }
  
  return(
    <div className="pb-20 pt-16">
      <Filter 
        show={showFilter}
        close={toggleFilter}
        filter={filterRes}
        config={filter_config}
      />
     <TopBar filterAction={toggleFilter} /> 
     <PdfList books={filteredBooks} />
     <Link className="px-5 py-2 rounded-2xl bg-blue-500 fixed bottom-28 right-5" to="/add-book">Add Pdf-Book</Link>
    </div>
    )
}