import { useState } from "react";

export default function VideoManager() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/embed/vqaS0DgAoGQ",
      type: "MS WORD",
      category: "Computer Operation",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    url: "",
    type: "MS WORD",
    category: "Computer Operation",
  });

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.url) {
      alert("Title & URL required");
      return;
    }

    if (editId) {
      setVideos(
        videos.map((v) =>
          v.id === editId ? { ...v, ...form } : v
        )
      );
    } else {
      setVideos([...videos, { id: Date.now(), ...form }]);
    }

    setForm({
      title: "",
      url: "",
      type: "MS WORD",
      category: "Computer Operation",
    });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (video) => {
    setForm(video);
    setEditId(video.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this video?")) {
      setVideos(videos.filter((v) => v.id !== id));
    }
  };

  // 🔥 autoplay OFF preview (controls hide + pointer disable)
  const getPreviewUrl = (url) => {
    return `${url}?controls=0&modestbranding=1&rel=0`;
  };

  return (
    <div className="py-20 p-4">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Video Manager</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Video
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Preview</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Videos Found
                </td>
              </tr>
            ) : (
              videos.map((v, i) => (
                <tr key={v.id} className="text-center">
                  <td className="border p-2">{i + 1}</td>

                  {/* iframe preview (non-clickable) */}
                  <td className="border p-2">
                    <div className="w-32 h-20 mx-auto pointer-events-none">
                      <iframe
                        src={getPreviewUrl(v.url)}
                        className="w-full h-full rounded"
                        title="preview"
                      />
                    </div>
                  </td>

                  <td className="border p-2">{v.title}</td>
                  <td className="border p-2">{v.type}</td>
                  <td className="border p-2">{v.category}</td>

                  <td className="border p-2 space-x-1">
                    <button
                      onClick={() => handleEdit(v)}
                      className="bg-yellow-400 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="text-lg font-bold mb-3">
              {editId ? "Edit Video" : "Add Video"}
            </h3>

            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <input
              name="url"
              placeholder="Embed URL"
              value={form.url}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            {/* Type Select */}
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option>MS WORD</option>
              <option>MS EXCEL</option>
              <option>MS POWERPOINT</option>
              <option>ONLINE RESORCES</option>
            </select>

            {/* Category Select */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option>Computer Operation</option>
              <option>IT Support</option>
            </select>

            <div className="flex justify-between mt-3">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}