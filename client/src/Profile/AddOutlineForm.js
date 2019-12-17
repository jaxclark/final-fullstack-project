import React, { useState, useContext, useEffect } from 'react'
import { WriterContext } from '../ContextProvider'

export default function AddOutlineForm() {
    const { stories, getStories, addOutline } = useContext(WriterContext)
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

    useEffect(() => {
        getStories()
    }, [])

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


    const getTheBloodyStories = (e) => {
        e.preventDefault()
        getStories()
        .then(handleAssocStory())
    }
    const handleAssocStory = () => {
        console.log(outlineState)
        for(let i = 0; i < stories.length; i++) { //do I need this? maybe not
            const thing = stories.find(title => title.title.includes(outlineState.story))
            return thing._id
        }
        // if(stories.includes('story')){
        //     return console.log('worked')
        // } else {
        //     return console.log('nope')
        // }
    }

    console.log(stories)
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
            <form onSubmit={getTheBloodyStories}>
                <h4>Add New Outline</h4>
                <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                <input onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Part One'/>
                <input onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Part Two'/>
                <input onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Part Three'/>
                <input onChange={handleChange} value={outlineState.partFour} type="text" name='partFour' placeholder='Part Four'/>
                <input onChange={handleChange} value={outlineState.partFive} type="text" name='partFive' placeholder='Part Five'/>
                <input onChange={handleChange} value={outlineState.partSix} type="text" name='partSix' placeholder='Part Six'/>
                <input onChange={handleChange} value={outlineState.partSeven} type="text" name='partSeven' placeholder='Part Seven'/>
                <input onChange={handleChange} value={outlineState.story} type="text" name='story' placeholder='Associated Story'/>
                <button>Submit</button>
            </form>
        </div>
    )
}