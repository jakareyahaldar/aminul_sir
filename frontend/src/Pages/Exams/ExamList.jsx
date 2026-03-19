import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

const ExamList = () => {
  
  const { exams } = useSelector( e => e.exams )

  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      
      {!exams.length && <p>Assessment list is empty.</p> }
      
      {exams.map((exam, index) => (
        <Link
          key={index}
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
      ))}
    </div>
  );
};

export default ExamList;