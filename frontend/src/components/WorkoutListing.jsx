import React from 'react'
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemMedia,
  ItemActions
} from '@/components/ui/item'
import { Dumbbell, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const WorkoutListing = ({workout}) => {
  return (
    <Item variant='outline' size='sm' asChild>
      <Link to={`/workout/${workout.id}`}>
        <ItemMedia>
          <Dumbbell />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {workout.workout_name}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRight />
        </ItemActions>
      </Link>
    </Item>
  )
}

export default WorkoutListing
