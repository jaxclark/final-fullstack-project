import React from 'react'
import Menu from './Menu'
import AddStoryForm from './AddStoryForm'

export default function NewStory() {
    return(
        <div className='newStoryPage'>
            <Menu />
            <AddStoryForm button='Submit' type='add' />
        </div>
    )
}