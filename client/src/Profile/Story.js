import React, { useState, useContext, useEffect } from 'react'
import { WriterContext } from '../ContextProvider'
import AddStoryForm from './AddStoryForm'
import { Link, withRouter } from 'react-router-dom'

function Story(props) {
    const [toggled, setToggled] = useState(true)
    const { deleteStory, editStory } = useContext(WriterContext)

    const toggle = () => {
        setToggled(prev => {
            return !prev
        })
    }

    const handleClick = () => {
        props.history.push(`/story/${props.story._id}`)
        {/* <Link to={`/story/${props.story._id}`}/> */}
    }

    const addOutline = (storyId) => {
        props.history.push(`/newoutline/${storyId}`)
    }

    const handleOutlineClick = (outlineId) => {
        props.history.push(`/outline/${outlineId}`)
        {/* <Link to={`/story/${props.story._id}`}/> */}
    }

    const mappedOutlines = props.outlines.map(outline => {
        return (
            <div className='mappedOutlines' onClick={() => handleOutlineClick(outline._id)}>{outline.title}</div>
        )
    })



    return(
        <div className='storyComponent'>
            {props.type === 'storiesPage' ?
                <div>
                    { toggled ? 
                    <div>
                        <div className='storyInfoDiv'>
                            <div className='singleStoryTitleDiv'>
                                <h2 onClick={handleClick}>{props.story.title}</h2>
                            </div>
                            {props.story.genre.map(genre => genre && <p className='singleStoryGenreP'>{genre}</p>)}
                            {props.story.summary && <p className='singleStorySummary'>{props.story.summary}</p>}
                            {mappedOutlines && mappedOutlines}
                        </div>
                        <div className='singleStoryButtons'>
                            <button onClick={() => addOutline(props.story._id)}>Add Outline</button>
                            <button onClick={() => {
                                editStory(props.story._id, props.story)
                                toggle()}}
                                >Edit</button>
                            <button
                                onClick={() => {
                                deleteStory(props.story._id)
                            }}>Delete</button>
                        </div>
                    </div>
                    :
                    <AddStoryForm button='Save' type='update' story={props.story} toggle={toggle} />
                    }                    
                </div>
            :
                <div className='singleStoryDiv'>
                    <div className='singleStoryTitleDiv'>
                        <h2 onClick={handleClick}>{props.story.title}</h2>
                    </div>
                    {mappedOutlines}
                </div>
            }
        </div>
    )
}

export default withRouter(Story)