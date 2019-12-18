import React, { useState, useContext, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import { WriterContext } from '../ContextProvider'
// import FilterSearch from './FilterSearch'

function AddOutlineForm(props) {
    const { stories, getStories, addOutline } = useContext(WriterContext)
    // const [toggle, setToggle] = useState(false)
    const [outlineState, setOutlineState] = useState({
        title: '',
        partOne: '', 
        partTwo: '', 
        partThree: '',
        partFour: '',
        partFive: '',
        partSix: '',
        partSeven: '',
        user: JSON.parse(localStorage.getItem("user")),
        story: props.match.params.storyId
    })

    useEffect(() => {
        getStories()
    }, [])

    const handleChange = e => {
        const {name, value} = e.target
        setOutlineState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const clearInputs = () => {
        setOutlineState({
            title: '',
            partOne: '', 
            partTwo: '', 
            partThree: '',
            partFour: '',
            partFive: '',
            partSix: '',
            partSeven: ''
        })
    }

    console.log(props.match.params.storyId)

    // const getTheBloodyStories = (e) => {
    //     e.preventDefault()
    //     // getStories()
    //     handleAssocStory()
    // }

    // const handleToggle = () => {setToggle(prev => !prev)}

    // const handleAssocStory = (e) => {
    //     console.log(outlineState)
    //     const thing = stories.find(title => title.title.includes(outlineState.story))
    //     setOutline(e, thing)
    //     // console.log(thing._id)
    // }
    
    // const setOutline = (e, thing) => {
    //     setOutlineState(prev => ({
    //         ...prev,
    //         story: thing._id
    //     }))
    //     dummyFunction(e)
    // }
    
    // const dummyFunction = (e) => {
    //     handleSubmit(e)
    // }
    console.log(outlineState)

    // console.log(stories)
    const handleSubmit = e => {
        e.preventDefault()
        console.log(outlineState)
        console.log('submitting')
        addOutline(outlineState)
            .then(() => {
                clearInputs()
            })
            .catch(err => console.log(err.response.data.message))
    }

    // const mappedStoryTitles = stories.map(story => <th key={story._id}>{story.title}</th>)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Add New Outline</h4>
                <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                <input onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Part One'/>
                <input onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Part Two'/>
                <input onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Part Three'/>
                <input onChange={handleChange} value={outlineState.partFour} type="text" name='partFour' placeholder='Part Four'/>
                <input onChange={handleChange} value={outlineState.partFive} type="text" name='partFive' placeholder='Part Five'/>
                <input onChange={handleChange} value={outlineState.partSix} type="text" name='partSix' placeholder='Part Six'/>
                <input onChange={handleChange} value={outlineState.partSeven} type="text" name='partSeven' placeholder='Part Seven'/>
                {/* <input onChange={handleChange} value={outlineState.story} type="text" name='story' placeholder='Associated Story'/> */}
                {/* <button type='button' onClick={handleToggle}>Choose Story</button>
                {toggle ? 
                <></>
                :
                <div>
                    <div>
                        <input type="text" name="story" value={outlineState.story} onChange={handleChange}/>
                        {mappedStoryTitles}
                        <button type='button' onClick={handleToggle}>Select Story</button>
                    </div>
                    <input style={{margin: '0 80px'}} type="text" name="story" value={outlineState.story} onChange={filterList}/>
                    <div>
                        {
                            stories.map((story => {
                                return <div key={story._id}>{story.title}</div>
                            }))
                        }
                    </div>
                </div>
                } */}
                {/* <FilterSearch content={stories && stories} /> */}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default withRouter(AddOutlineForm)