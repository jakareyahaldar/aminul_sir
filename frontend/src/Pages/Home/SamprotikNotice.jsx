import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function NewsSlider() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  
  let {notices,isLoading} = useSelector(e=>e.notice)
  notices = notices.slice(0,5)

  // auto slide
  useEffect(() => {
    if (!notices.length) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % notices.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [notices])

  // loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="h-28 bg-gray-200 animate-pulse rounded-2xl" />
      </div>
    )
  }

  // empty state
  if (!notices.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        কোনো নোটিস পাওয়া যায়নি
      </div>
    )
  }

  const notice = notices[current]

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-5 bg-red-500 rounded"></span>
          সাম্প্রতিক বার্তা
        </h2>

        <button
          onClick={() => navigate("/notice")}
          className="text-green-600 text-sm font-medium"
        >
          সবগুলো
        </button>
      </div>

      {/* Slider Card */}
      <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
        
        {/* Time */}
        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          ⏱ {formatTimeAgo(notice.createdAt)}
        </p>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {notice.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {notice.description}
        </p>

        {/* Read more */}
        <button
          onClick={() => navigate(`/notice/${notice._id}`)}
          className="text-green-600 text-sm mt-2 flex items-center gap-1"
        >
          বিস্তারিত পড়ুন →
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200 rounded mt-2 overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${((current + 1) / notices.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

// helper
function formatTimeAgo(date) {
  const diff = Math.floor((new Date() - new Date(date)) / 1000)

  const days = Math.floor(diff / 86400)
  if (days > 0) return `${days} দিন আগে`

  const hours = Math.floor(diff / 3600)
  if (hours > 0) return `${hours} ঘন্টা আগে`

  const minutes = Math.floor(diff / 60)
  if (minutes > 0) return `${minutes} মিনিট আগে`

  return "এইমাত্র"
}