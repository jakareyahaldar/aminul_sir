import { useState } from "react"
import TopBar from "./TopBar.jsx"
import PdfList from "./PdfList.jsx"
import Filter from "../../Components/Filter.jsx"

import { useSelector } from "react-redux"

export default function PdfBoi(){
  
  const books = useSelector(s =>s.books.books)
  
  const [ filterStatus, setFilterStatus ] = useState(false)
  const [ filter, setFl ] = useState({})
  
  const filteredBooks = books.filter((book)=>{
    const allpass = Object.keys(filter).every((type)=>{
      if(!filter[type]) return true
      return book[type]===filter[type]
    })
    return allpass
  })
  
  console.log(filteredBooks)
  
  function filterToggle(){
    setFilterStatus(!filterStatus)
  }
  
  
  function update_filterData(key,val){
    return setFl(()=>{
          if(filter[key]===val){
            return {...filter,[key]:null}
          }else{
            return {...filter,[key]:val}
          }
        })
  }
  
  const filterConfig = {
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
      },
      ]
  }
  
  return(
    <div className="pb-20 pt-16">
    <Filter 
      close={filterToggle}
      show={filterStatus} 
      config={filterConfig} 
      filter={filter} 
    />
     <TopBar filterAction={filterToggle} /> 
     <PdfList list={filteredBooks} />
    </div>
    )
}