import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {

  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  console.log(token)

  // if(!token) {
  //   navigate('/user-login')
  // }

  useEffect(() => {
    if(!token) {
      navigate('/user-login')
    }
  }, [token, navigate])

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper