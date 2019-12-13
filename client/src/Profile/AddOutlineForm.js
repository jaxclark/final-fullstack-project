import React, { useState, useContext } from 'react'
import { WriterContext } from '../ContextProvider'

export default function AddOutlineForm() {
    const { addOutline } = useContext(WriterContext)
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
        story: ''
    })
    //for story have the person select the name of the story they're adding it to, and then 
    //  use a find to get the story id? 

    const handleChange = e => {
        e.persist()
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
            partSeven: '',
            story: ''
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        addOutline({outlineState})
            .then(() => {
                clearInputs()
            })
            .catch(err => console.log(err.response.data.message))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Add New Outline</h4>
                <input onChange={handleChange} value={title} type="text" name='title' placeholder='Title'/>
                <input onChange={handleChange} value={partOne} type="text" name='partOne' placeholder='Part One'/>
                <input onChange={handleChange} value={partTwo} type="text" name='partTwo' placeholder='Part Two'/>
                <input onChange={handleChange} value={partThree} type="text" name='partThree' placeholder='Part Three'/>
                <input onChange={handleChange} value={partFour} type="text" name='partFour' placeholder='Part Four'/>
                <input onChange={handleChange} value={partFive} type="text" name='partFive' placeholder='Part Five'/>
                <input onChange={handleChange} value={partSix} type="text" name='partSix' placeholder='Part Six'/>
                <input onChange={handleChange} value={partSeven} type="text" name='partSeven' placeholder='Part Seven'/>
                <input onChange={handleChange} value={story} type="text" name='story' placeholder='Associated Story'/>
                <button>Submit</button>
            </form>
        </div>
    )
}