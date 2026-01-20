import React from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center w-full h-100 gap-1'>
      <TriangleAlert className='text-orange-400' size={120}/>
      <h1 className='text-2xl'>Page Not Found!</h1>
      <h2 className='text-xl text-gray-500'>The page you were looking for doesnt seem to exist...</h2>
      {/* <h2 className='text-lg text-gray-500'>Either go back to the previous page or return to the homepage</h2> */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <Button onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Link to={'/'}>
          <Button>Return Home</Button>
        </Link>
        
      </div>
    </div>
  )
}

export default NotFoundPage
