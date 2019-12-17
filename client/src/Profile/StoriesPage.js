import React, { useContext } from 'react'
import StoriesList from './StoriesList'
import AddStoryForm from './AddStoryForm'
import { WriterContext } from '../ContextProvider'
import '../styling/storiesStyles.scss'

export default function StoriesPage() {
    const { addStory } = useContext(WriterContext)
    
    return(
        <div className='storiesPage'>
            <AddStoryForm addStory={addStory} button='Submit' type='add' />
            <StoriesList type='storiesPage' />
        </div>
    )
}