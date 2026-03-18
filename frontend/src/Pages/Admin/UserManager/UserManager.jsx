import { useEffect, useState } from "react"
import BackAndTitle from "../../../Components/BackAndTitle.jsx"

export default function UsersManagement() {
  const API = import.meta.env.VITE_API_URL

  const [ users, setUsers ] = useState([])
  const [loading,setLoading] = useState(false)
  
  // fetch users
  const fetchUsers = async () => {
    setLoading(true)
    try{
      const req = await fetch(API+"/users")
      const res = await req.json()
      setLoading(false)
      if(req.ok){
        setUsers(res.users)
      }else{
        throw Error(res.message)
      }
    }catch(err){
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // toggle approve
  const toggleApprove = async (id, currentStatus) => {
    try {
      const req = await fetch(`${API}/users/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAprove: !currentStatus })
      })
      
      const res = await req.json()
      
      if(req.ok){
        setUsers(()=>{
          return users.map((user)=>{
            if(user._id === id){
              return {...user, isAprove: !currentStatus}
            }else{
              return user
            }
            
          })
        })
      }else{
        throw Error("Faild.")
      }
      
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <div className="p-4 py-20">
      <BackAndTitle path="/admin" title="User Management" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Avatar</th>
                <th className="p-2">Name</th>
                <th className="p-2">Username</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user._id} className="text-center border-t">
                  <td className="p-2">
                    <img
                      src={user.avatar || "https://via.placeholder.com/40"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>

                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.phone}</td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        user.isAprove ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.isAprove ? "Approved" : "Pending"}
                    </span>
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() =>
                        toggleApprove(user._id, user.isAprove)
                      }
                      className={`px-3 py-1 rounded text-white ${
                        user.isAprove
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {user.isAprove ? "Unapprove" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}