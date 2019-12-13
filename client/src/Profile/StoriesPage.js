import React, { useContext } from 'react'
import StoriesList from './StoriesList'
import AddStoryForm from './AddStoryForm'
import { WriterContext } from '../ContextProvider'

export default function StoriesPage() {
    const { addStory } = useContext(WriterContext)
    
    return(
        <div>
            <AddStoryForm addStory={addStory} button='Submit' type='add' />
            <StoriesList type='storiesPage' />
        </div>
    )
}