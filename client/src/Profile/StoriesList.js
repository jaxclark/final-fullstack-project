import React, { useContext, useEffect } from 'react'
import Story from './Story'
import AddStoryForm from './AddStoryForm'
import { WriterContext } from '../ContextProvider'

function StoriesList(props) {
    const { stories, getStories, addStory, editStory, deleteStory } = useContext(WriterContext)

    useEffect(() => {
        getStories()
    }, [])

    const mappedStories = stories.map(story => {
            return (
                <Story 
                key={story._id}
                story={story}
                editStory={editStory}
                deleteStory={deleteStory}
                />
            )
    })

    return(
        <div>
            <AddStoryForm addStory={addStory} />
            {mappedStories}
        </div>
    )
}

export default StoriesList