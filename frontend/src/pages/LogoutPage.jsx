import React, { useEffect } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'

const LogoutPage = () => {
  const logoutMutation = useMutation({
    mutationFn: () => {
      return axios.post('/api/users/logout')
    }
  })
  const logoutUser = useUserStore((state) => state.logoutUser)
  const navigate = useNavigate()


  useEffect(() => {
    logoutMutation.mutate()
    localStorage.removeItem('userInfo')
    logoutUser()
    navigate('/')
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default LogoutPage
