import React from 'react'
import { Dumbbell } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='w-full h-150 flex flex-col gap-4 items-center justify-center '>
      <div className="">
        <span className='flex items-center gap-2'>
          <Dumbbell className='' size={36}/>
          <h1 className='text-4xl'>Workout Tracker</h1>
        </span>
        <h2 className='text-lg font-light text-gray-600'>Track your workouts, track your progress</h2>
      </div>
      <Link to={'/signup'}>
        <Button>Get Started!</Button>
      </Link>

    </div>
  )
}

export default Hero
