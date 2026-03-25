import { useNavigate } from "react-router-dom"

export default function AssessmentCard(){
  const navi = useNavigate()
  return(
    <div onClick={()=>navi("/assessment")} className="group hover:scale-95 transition-all p-5 m-4 rounded-2xl shadow-xl border relative">
          <p className="text-xl font-bold text-blue-500">লাইভ অ্যাসেসমেন্ট </p>
          <p className="text-blue-300">লাইভ অ্যাসেসমেন্ট দিয়ে দক্ষতা যাচাই🗣️</p>
          <svg fill="#30ec19b3" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 mb-1 scale-[200%] -rotate-45 absolute right-11 top-10 group-hover:rotate-0 transition-[2s]">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> 
          </svg>
          <p className="text-xs text-end mt-5 text-sky-400">শুরু করুন</p>
    </div>
    )
}