import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.warn("Backend logout failed, forcing frontend logout")
      } finally {
        localStorage.removeItem('accessToken')
        navigate('/user-login')
      }
    }

    logout()
  }, [token, navigate])

  return <div className=' text-6xl font-bold text-center'>Logging out...</div>
}

export default UserLogout
