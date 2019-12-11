import React, { useState, useContext } from 'react'
import { WriterContext } from '../ContextProvider'

export default function AddStoryForm() {
    const { addStory } = useContext(WriterContext)
    const [title, setTitle] = useState('')

    const handleChange = e => {
        e.persist()
        setTitle(e.target.value)
    }

    const clearInputs = () => {
        setTitle('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addStory({title})
            .then(() => {
                clearInputs()
            })
            .catch(err => console.log(err.response.data.message))
    }

    return(
        <div>
            <form onSubmit={handleSubmit} >
                <h4>Add New Story</h4>
                <input 
                    name='title'
                    value={title}
                    onChange={handleChange}
                    placeholder='Title'
                    type="text"/>
                <button>Submit</button>
            </form>
        </div>
    )
}