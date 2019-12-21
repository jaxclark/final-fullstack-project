import React, { useState, useContext, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import { WriterContext } from '../ContextProvider'
// import FilterSearch from './FilterSearch'

function AddOutlineForm(props) {
    const { getStories, addOutline } = useContext(WriterContext)
    // const [toggle, setToggle] = useState(false)
    const [outlineType, setOutlineType] = useState('threeAct')
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

    const handleOutlineType = e => {
        const {value} = e.target
        setOutlineType(value)
    }

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
        props.history.push(`/stories`)
    }

    return(
        <div className='addOutlineDiv'>
            <form className='addOutlineForm' onSubmit={handleSubmit}>
                <h2>Add New Outline</h2>
                <select onChange={handleOutlineType} className='addOutlineSelect'>
                    <option value="threeAct">Three Act Structure</option>
                    <option value="sevenPoint">Seven Point System</option>
                </select>
                {outlineType === 'sevenPoint' ? 
                <>
                    <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                    <textarea onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Hook'/>
                    <textarea onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Plot Twist One'/>
                    <textarea onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Pinch One'/>
                    <textarea onChange={handleChange} value={outlineState.partFour} type="text" name='partFour' placeholder='Midpoint'/>
                    <textarea onChange={handleChange} value={outlineState.partFive} type="text" name='partFive' placeholder='Pinch Two'/>
                    <textarea onChange={handleChange} value={outlineState.partSix} type="text" name='partSix' placeholder='Plot Twist Two'/>
                    <textarea onChange={handleChange} value={outlineState.partSeven} type="text" name='partSeven' placeholder='Resolution'/>
                    <div className='addOutlineButton'>
                        <button>Submit</button>
                    </div>
                </>
                :
                <>
                    <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                    <textarea onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Act One'/>
                    <textarea onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Act Two'/>
                    <textarea onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Act Three'/>
                    <div className='addOutlineButton'>
                        <button>Submit</button>
                    </div>
                </>
                }
            </form>
        </div>
    )
}

export default withRouter(AddOutlineForm)