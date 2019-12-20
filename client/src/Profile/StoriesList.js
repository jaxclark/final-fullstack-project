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
                />
    })

    return(
        <div className='storiesList'>
            {mappedStories}
        </div>
    )
}

export default StoriesList