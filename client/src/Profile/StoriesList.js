import React, { useContext, useEffect } from 'react'
import Story from './Story'
import { WriterContext } from '../ContextProvider'

function StoriesList(props) {
    const { stories, getStories, editStory, deleteStory, outlines, getOutlines } = useContext(WriterContext)

    useEffect(() => {
        getStories()
        getOutlines()
    }, [])

    const mappedStories = stories.map(story => {
        const storyOutlines = outlines.filter(outline => outline.story === story._id)
        return <Story 
                key={story._id}
                type={props.type}
                story={story}
                editStory={editStory}
                deleteStory={deleteStory}
                outlines={storyOutlines}
                classname={
                    story.genre === 'Crime' ? 'crime'
                    : story.genre === 'Mystery' ? 'mystery'
                    : story.genre === 'Fantasy' ? 'fantasy'
                    : story.genre === 'Romance' ? 'romance'
                    : story.genre === 'Science Fiction' ? 'scienceFiction'
                    : story.genre === 'Western' ? 'western'
                    : story.genre === 'Horror' ? 'horror'
                    : story.genre === 'Inspirational' ? 'inspirational'
                    : story.genre === 'Non-Fiction' ? 'nonFiction'
                    : story.genre === 'Biography' ? 'biography'
                    : 'none'}
                />
    })

    return(
        <div>
            {mappedStories}
        </div>
    )
}

export default StoriesList