import React, { useEffect, useState, useMemo } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useWorkoutStore } from '@/stores/workoutStore'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
 } from './ui/card'
 import { Spinner } from './ui/spinner'
 import WorkoutListing from './WorkoutListing'

const Dashboard = () => {
  const user = useUserStore((state) => state.user)
  const workouts = useWorkoutStore((state) => state.workouts)
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts)

  const fetchWorkoutsQuery = useQuery({
    queryKey: ['workouts', user],
    queryFn: async () => {
      const res = await axios.get(`/api/workouts`)
      setWorkouts(res.data)
      return res.data
    }
  })


  return (
    <div className='w-full h-150 flex flex-col gap-4 items-start justify-start lg:px-64 xl:px-128'>
      <Card className={'w-full'}>
        <CardHeader>
          <CardTitle>Welcome {user.name}</CardTitle>
        </CardHeader>
        <CardContent className={'min-h-16'}>
          {fetchWorkoutsQuery.isPending ? <div className="flex items-center justify-center"><Spinner className={'size-8'}></Spinner></div> : <div className="">

          {workouts !== 0
            ? <div className="flex flex-col gap-6">
                {workouts.map((workout) => {
                  return <WorkoutListing key={workout.id} workout={workout} />
                })}
              </div> 
            : <div className="">No Workouts Found</div> }
            </div>}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
