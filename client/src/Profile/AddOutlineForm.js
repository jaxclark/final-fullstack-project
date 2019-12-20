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
                <button>Submit</button>
            </form>
        </div>
    )
}

export default withRouter(AddOutlineForm)