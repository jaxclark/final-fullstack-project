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

    const mappedOutlines = props.outlines.map(outline => {
        return (
            <div className='mappedOutlines'>{outline.title}</div>
        )
    })

    const handleClick = () => {
        props.history.push(`/story/${props.story._id}`)
        {/* <Link to={`/story/${props.story._id}`}/> */}
    }

    const addOutline = (storyId) => {
        props.history.push(`/newoutline/${storyId}`)
    }

    return(
        <div className='storyComponent'>
            {props.type === 'storiesPage' ?
                <div>
                    { toggled ? 
                    <div>
                        <div className='storyInfoDiv' onClick={handleClick}>
                            <h3>{props.story.title}</h3>
                            <p>{`${props.story.genre}`}</p>
                            <p>{props.story.summary}</p>
                            {mappedOutlines}
                        </div>
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
                    :
                    <AddStoryForm button='Save' type='update' story={props.story} toggle={toggle} />
                    }                    
                </div>
            :
                <div className='singleStoryDiv' onClick={handleClick}>
                    <h2>{props.story.title}</h2>
                    {mappedOutlines}
                </div>
            }
        </div>
    )
}

export default withRouter(Story)