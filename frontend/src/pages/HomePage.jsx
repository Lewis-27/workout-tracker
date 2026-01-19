import React from 'react'
import Hero from '@/components/Hero'
import Dashboard from '@/components/Dashboard'
import { useUserStore } from '@/stores/userStore'

const HomePage = () => {
  const user = useUserStore((state) => state.user)
  return (
    <div className="">
      {user.name ? <Dashboard /> : <Hero />}
    </div>
  )
}

export default HomePage
