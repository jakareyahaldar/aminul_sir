import { useState, useEffect } from "react"

import PdfCard from "./PdfCard.jsx"


export default function PdfList({books}){
  const API = import.meta.env.VITE_API_URL
  
  
  
  return(
    <div className="p-5 pb-10">
      <div className="my-5">
        <h3 className="text-xl font-bold">বই ও শীট সংগ্রহ</h3>
        <p className="text-sm">মোট {books.length} টি ফাইল</p>
      </div>
      
      {books.length === 0 && <EmptyCase />}
      
      <div className="grid md:grid-cols-2 gap-3">
        
        {
          books.map((book)=>{
            return <PdfCard 
              data={book}
            />
            
          })
        }
        
      </div>
      
    </div>
    )
}



function EmptyCase(){
  return(
    <div className="p-5 border-[1px] border-black rounded-xl shadow-2xl">
        <p className="text-center">কোনো ফাইল নাই</p>
      </div>
    )
}