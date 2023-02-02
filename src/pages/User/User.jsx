import { useEffect, useState } from "react"
import { api } from "../../api/api";

import { InfoUser } from '../../components/InfoUser/InfoUser'


export function User() {
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      // const res = await api.allUsers(token);
      const res = await api.me(token);
      const responce = await res.json()

      setUser(responce)

      console.log(responce);
    }


    fetchData()
  }, [])

  return (
    <div>
      <InfoUser user={user} />
    </div>
  )
}