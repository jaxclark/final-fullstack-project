import React, { useContext } from 'react'
import StoriesList from './StoriesList'
import Menu from './Menu'
import { WriterContext } from '../ContextProvider'
import { withRouter } from 'react-router-dom'
import '../styling/storiesStyles.scss'

function StoriesPage(props) {
    const { addStory } = useContext(WriterContext)
    
    const handleClick = () => {
        props.history.push(`/newstory/`)
    }

    return(
        <div className='storiesPage'>
            <Menu />
            <div className='newStoryButtonDiv'>
                <button className='newStoryButton' onClick={handleClick}>New</button>
            </div>
            <StoriesList type='storiesPage' />
        </div>
    )
}

export default withRouter(StoriesPage)