import { useState } from "react"
import { useNavigate } from "react-router-dom"

const UnapprovedUser = () => {
  const API = import.meta.env.VITE_API_URL
  
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRefresh = async () => {
    try {
      setLoading(true)
      
      const user_lsdta = localStorage.getItem("user_data")
      const user = user_lsdta ? JSON.parse(user_lsdta): null
      if(!user) return 
      
      const res = await fetch(API+"/get-user/"+user._id)
      const data = await res.json()

      if (res.ok) {
        // token save
        localStorage.setItem("user_data", JSON.stringify(data.data))

        // home redirect
        navigate("/")
      } else {
        alert("এখনো আপনার একাউন্ট অনুমোদিত হয়নি")
      }

    } catch (err) {
      console.error(err)
      alert("কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-sm w-full">
        
        <h2 className="text-xl font-bold text-red-500 mb-3">
          একাউন্ট অনুমোদিত নয় ❌
        </h2>

        <p className="text-gray-600 mb-5">
          আপনার একাউন্ট এখনো অনুমোদিত হয়নি।  
          অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "চেক করা হচ্ছে..." : "রিফ্রেশ করুন 🔄"}
        </button>
      </div>
    </div>
  )
}

export default UnapprovedUser