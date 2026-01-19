import React, { useEffect } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import { useWorkoutStore } from '@/stores/workoutStore'

const LogoutPage = () => {
  const logoutMutation = useMutation({
    mutationFn: () => {
      return axios.post('/api/users/logout')
    }
  })
  const logoutUser = useUserStore((state) => state.logoutUser)
  const clearWorkouts = useWorkoutStore((state) => state.clearWorkouts)
  const navigate = useNavigate()


  useEffect(() => {
    logoutMutation.mutate()
    localStorage.removeItem('userInfo')
    logoutUser()
    clearWorkouts()
    navigate('/')
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default LogoutPage
