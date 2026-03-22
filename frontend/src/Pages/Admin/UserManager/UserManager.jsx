import { useEffect, useState } from "react"
import BackAndTitle from "../../../Components/BackAndTitle.jsx"

export default function UsersManagement() {
  const API = import.meta.env.VITE_API_URL

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  // fetch users
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const req = await fetch(API + "/users")
      const res = await req.json()
      setLoading(false)

      if (req.ok) {
        setUsers(res.users)
      } else {
        throw Error(res.message)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // approve toggle
  const toggleApprove = async (id, currentStatus) => {
    try {
      const req = await fetch(`${API}/users/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAprove: !currentStatus }),
      })

      if (req.ok) {
        setUsers(users.map(u =>
          u._id === id ? { ...u, isAprove: !currentStatus } : u
        ))

        if (selectedUser?._id === id) {
          setSelectedUser({
            ...selectedUser,
            isAprove: !currentStatus
          })
        }
      } else {
        throw Error("Failed")
      }
    } catch (err) {
      alert(err.message)
    }
  }

  // delete user
  const deleteUser = async (id) => {
    const confirmDelete = confirm("Are you sure?")
    if (!confirmDelete) return

    try {
      const req = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      })

      if (req.ok) {
        setUsers(users.filter(u => u._id !== id))
        setSelectedUser(null)
      } else {
        throw Error("Delete failed")
      }
    } catch (err) {
      alert(err.message)
    }
  }

  // filter users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search)
  )

  return (
    <div className="p-4 py-20">

      {!selectedUser ? (
        <>
          <BackAndTitle path="/admin" title="User Management" />

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full p-2 border rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">

              {filteredUsers.map(user => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className="border rounded-xl p-4 shadow cursor-pointer hover:shadow-lg transition "
                >
                  <img
                    src={user.avatar || "https://via.placeholder.com/80"}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />

                  <h2 className="text-center mt-2 font-bold">{user.name}</h2>
                  <p className="text-center text-sm">{user.phone}</p>

                  <div className="text-center mt-2">
                    <span
                      className={`px-2 py-1 text-white text-xs rounded ${
                        user.isAprove ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.isAprove ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}
        </>
      ) : (
        // DETAILS VIEW
        <div className="max-w-md mx-auto border p-4 rounded-xl shadow">

          <button
            onClick={() => setSelectedUser(null)}
            className="mb-3 text-blue-500"
          >
            ← Back
          </button>

          <img
            src={selectedUser.avatar || "https://via.placeholder.com/100"}
            className="w-24 h-24 rounded-full mx-auto"
          />

          <h2 className="text-center text-xl font-bold mt-2">
            {selectedUser.name}
          </h2>

          <p className="text-center">{selectedUser.username}</p>
          <p className="text-center">{selectedUser.phone}</p>

          <div className="text-center mt-2">
            <span
              className={`px-2 py-1 text-white text-xs rounded ${
                selectedUser.isAprove ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {selectedUser.isAprove ? "Approved" : "Pending"}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-4 justify-center">

            <button
              onClick={() =>
                toggleApprove(selectedUser._id, selectedUser.isAprove)
              }
              className={`px-3 py-1 rounded text-white ${
                selectedUser.isAprove
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            >
              {selectedUser.isAprove ? "Unapprove" : "Approve"}
            </button>

            <button
              onClick={() => deleteUser(selectedUser._id)}
              className="px-3 py-1 bg-black text-white rounded"
            >
              Delete
            </button>

          </div>
        </div>
      )}
    </div>
  )
}