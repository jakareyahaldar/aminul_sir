import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
// const notices = [
//   {
//     id: 1,
//     title: "Junior Developer Job Circular",
//     description: "We are hiring a junior developer for our IT team.",
//     category: "job",
//     time: "2026-03-18 10:00 AM",
//   },
//   {
//     id: 2,
//     title: "General Meeting Notice",
//     description: "Monthly general meeting will be held tomorrow.",
//     category: "general",
//     time: "2026-03-17 03:30 PM",
//   },
//   {
//     id: 3,
//     title: "Frontend Developer Needed",
//     description: "Looking for React developer with 1+ year experience.",
//     category: "job",
//     time: "2026-03-16 09:15 AM",
//   },
//   {
//     id: 4,
//     title: "Office Holiday Notice",
//     description: "Office will remain closed on Friday.",
//     category: "general",
//     time: "2026-03-15 05:00 PM",
//   },
// ];

export default function NoticeBoard() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  
  const { notices } = useSelector(e=>e.notice)
  
  const filteredNotices = notices.filter((notice) => {
    const matchCategory =
      category === "all" ? true : notice.category === category;

    const matchSearch = notice.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="py-20 p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📢 Notice Board</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <select
          className="border p-2 rounded w-full md:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="job">চাকরি</option>
          <option value="general">সাধারণ</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notice List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                {notice.title}
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                {notice.description?.slice(0,50)}
                <Link className="text-blue-300 underline" to={"/notice/"+notice._id}>more</Link>
              </p>

              <div className="text-xs text-gray-500 flex justify-between">
                <span>🕒 {new Date(notice.updatedAt).toUTCString()}</span>
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
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No notices found
          </p>
        )}
      </div>
    </div>
  );
}
