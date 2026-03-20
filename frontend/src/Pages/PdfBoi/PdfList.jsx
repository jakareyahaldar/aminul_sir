import { useState, useEffect } from "react"

import PdfCard from "./PdfCard.jsx"
import ImageObj from "../../utilities/placeImage.js"

export default function PdfList({list}){
  const API = import.meta.env.VITE_API_URL
  
  const books = list
  
  return(
    <div className="p-5">
      <div className="my-5">
        <h3 className="text-xl font-bold">বই ও শীট সংগ্রহ</h3>
        <p className="text-sm">মোট {books.length} টি ফাইল</p>
      </div>
      
      {books.length === 0 && <EmptyCase />}
      
      <div className="grid md:grid-cols-2 gap-3">
        
        {
          books.map((book)=>{
            return <PdfCard 
            key={book._id}
            _id={book._id} 
            title={book.title} 
            level={book.level} 
            category={book.category} 
            image={ImageObj[book.file_type]}
            size={book.size} 
            file_type={book.file_type}
            file_url={book.file_url}
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