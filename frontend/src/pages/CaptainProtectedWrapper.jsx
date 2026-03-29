import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {

  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading ] = useState(true)

  // console.log(token)

  // if(!token) {
  //   navigate('/user-login')
  // }

  useEffect(() => {
    if(!token) {
      navigate('/captain-login')
      return;
    }

    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        // console.log("Captain Profile Response:", response.data);
        // console.log("FULL RESPONSE:", response.data);
        // console.log("ACTUAL CAPTAIN DATA:", response.data.data);

        if (response.status === 200) {
          setCaptain(response.data.data) 
          setIsLoading(false)
        }

      } catch (error) {
        console.log(error)
        localStorage.removeItem('accessToken')
        navigate('/captain-login')
      }
    }

    fetchCaptainProfile()
  }, [token, navigate, setCaptain])


  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper