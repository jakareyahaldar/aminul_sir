import { useState } from "react"

const donorsData = [
  {
    id: 1,
    name: "Rahim Uddin",
    phone: "01700000000",
    blood: "A+",
    address: "Khulna, Bangladesh",
    lastDonate: "2 months ago",
  },
  {
    id: 2,
    name: "Karim Sheikh",
    phone: "01800000000",
    blood: "B+",
    address: "Dhaka, Bangladesh",
    lastDonate: "1 month ago",
  },
  {
    id: 3,
    name: "Sadia Akter",
    phone: "01900000000",
    blood: "O-",
    address: "Jessore, Bangladesh",
    lastDonate: "3 months ago",
  },
]

export default function BloodDonorList() {
  const [search, setSearch] = useState("")
  const [group, setGroup] = useState("")
  const [selected, setSelected] = useState(null)

  const filtered = donorsData.filter(d =>
    (d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)) &&
    (group ? d.blood === group : true)
  )

  return (
    <div className="p-4 py-20">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={group}
          onChange={e => setGroup(e.target.value)}
        >
          <option value="">All Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Card List */}
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <p className="text-gray-500">No donors found</p>
        )}

        {filtered.map(d => (
          <div
            key={d.id}
            className="bg-white shadow rounded-2xl p-4 cursor-pointer hover:shadow-lg"
            onClick={() => setSelected(d)}
          >
            <h2 className="text-xl font-bold">{d.name}</h2>
            <p className="text-red-500 font-semibold">{d.blood}</p>
            <p className="text-sm text-gray-600">{d.address}</p>

            <a
              href={`tel:${d.phone}`}
              className="block mt-3 bg-green-500 text-white text-center py-1 rounded"
              onClick={e => e.stopPropagation()}
            >
              Call Now
            </a>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[90%] md:w-[400px]">
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p><b>Blood:</b> {selected.blood}</p>
            <p><b>Phone:</b> {selected.phone}</p>
            <p><b>Address:</b> {selected.address}</p>
            <p><b>Last Donate:</b> {selected.lastDonate}</p>

            <a
              href={`tel:${selected.phone}`}
              className="block mt-3 bg-green-500 text-white text-center py-2 rounded"
            >
              Call Now
            </a>

            <button
              onClick={() => setSelected(null)}
              className="mt-2 w-full bg-gray-300 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}