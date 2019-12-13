import React, { useContext, useEffect } from 'react'
import Story from './Story'
import { WriterContext } from '../ContextProvider'

function StoriesList(props) {
    const { stories, getStories, editStory, deleteStory } = useContext(WriterContext)

    useEffect(() => {
        getStories()
    }, [])

    const mappedStories = stories.map(story => 
                <Story 
                key={story._id}
                type={props.type}
                story={story}
                editStory={editStory}
                deleteStory={deleteStory}
                classname={
                    story.genre === 'Crime' ? 'Crime' 
                    : story.genre === 'Mystery' ? 'Mystery' 
                    : story.genre === 'Romance' ? 'Romance' 
                    : 'None'}
                />
    )

    return(
        <div>
            {mappedStories}
        </div>
    )
}

export default StoriesList