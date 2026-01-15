import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div >
      <Header />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App
