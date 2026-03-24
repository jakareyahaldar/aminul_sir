import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function AssessmentCard(){
  
  const { exams } = useSelector(e=>e.exams)
  const exam = exams[0] || null
  
  if(!exam) return null
  
  return(
    <div className="p-4">
      <Link
          to={exam.path}
          className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          {/* Icon */}
          <div className="text-blue-500 text-3xl">
            <i className="fa-solid fa-file-lines"></i>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {exam.title}
            </h2>
            <p className="text-sm text-gray-500">Click to start exam</p>
          </div>
        </Link>
    </div>
    )
}