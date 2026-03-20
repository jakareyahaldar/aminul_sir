import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"

// Function to detect and convert links in text
const parseTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-semibold bg-blue-50 px-1 rounded"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function NoticeDetails() {
  const navigate = useNavigate();
  const {_id} = useParams()
  
  const { notices } = useSelector(e=>e.notice)
  
  const [notice] = notices.filter( n=> n._id === _id )
  
  if (!notice) {
    return (
      <div className="py-20 p-6 text-center text-gray-500">
        No Notice Found
      </div>
    );
  }

  return (
    <div className="py-20 pb-25 max-w-3xl mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
      >
        ⬅️ Back
      </button>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-5">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-3">
          {notice.title}
        </h1>

        {/* Meta */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>🕒 {notice.createdAt || notice.time}</span>
          <span
            className={`px-2 py-1 rounded text-white ${
              notice.category === "job"
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
          >
            {notice.category === "job" ? "চাকরি" : "সাধারণ"}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed break-words">
          {parseTextWithLinks(notice.description)}
        </p>
      </div>
    </div>
  );
}
