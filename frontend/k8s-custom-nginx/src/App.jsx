import { useEffect, useState } from "react"

function App() {
  const [users, serUsers] = useState([])

  useEffect(() => {
    const fetchusers = async () => {
      console.log(import.meta.env.VITE_BACKEND_URI)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI
        }/users`)
      const data = await res.json()
      console.log(data.allUsers)
      serUsers(data.allUsers)
    }
    fetchusers()
  }, [])

  return (<>
    <h1>Welcome to k8s tutotrial</h1>
    {users.map((elem) => {
      return (
        <h1 style={{ color: "White" }}>
          {elem.name}
        </ h1>)
    })}
  </>)
}

export default App