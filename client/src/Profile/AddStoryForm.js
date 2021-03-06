import React, { useState, useContext, useEffect } from 'react'
import { WriterContext } from '../ContextProvider'
import { withRouter } from 'react-router-dom'

function AddStoryForm(props) {
    const { addStory, editStory } = useContext(WriterContext)
    const [storyState, setStoryState] = useState({
        title: '',
        genre: [],
        summary: '',
        user: JSON.parse(localStorage.getItem("user"))
    })
    const [uniqueGenre, setUniqueGenre] = useState('')
    const [toggleOtherGenre, setOtherToggle] = useState(true)
    const [toggleGenreButtons, setToggleGenres] = useState(false)
    const [errorMessage, setError] = useState('')

    useEffect(() => {
        updateStory()
    }, [])

    const toggleOther = () => {
        setOtherToggle(prev => {
            return !prev
        })
        console.log(uniqueGenre)
        if(uniqueGenre) {
            setStoryState(prev => { 
                const filterDups = new Set([...prev.genre, uniqueGenre])
                const toArray = [...filterDups]
                return {
                    ...prev,
                    genre: toArray
                }
            })
        }
        clearUniqueGenre()
    }

    const handleUniqueGenre = e => {
        const { value } = e.target
        setUniqueGenre(value)
    }

    const clearUniqueGenre = () => {
        if(toggleOtherGenre) {
            setUniqueGenre('')
        }
        return
    }

    const toggleGenres = () => {setToggleGenres(prev => !prev)}

    const updateStory = () => {
        if(props.type === 'update') {
            setStoryState(props.story)
        }
        console.log(storyState)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setStoryState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleGenre = e => {
        const { value } = e.target
        setStoryState(prev => { 
            const filterDups = new Set([...prev.genre, value])
            const toArray = [...filterDups]
            return {
                ...prev,
                genre: toArray
            }
        })
    }

    const deleteGenres = () => {
        setStoryState(prev => {
            return {
                ...prev,
                genre: []
            }
        })
    }

    const clearInputs = () => {
        setStoryState({
            title: '',
            genre: [],
            summary: ''
        })
        setError('')
        setOtherToggle(true)
        setToggleGenres(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(props.type === 'add') {
            addStory(storyState)
                .then(() => {
                    clearInputs()
                    props.history.push(`/stories/`)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                })
        } else {
            editStory(props.story._id, storyState)
                .catch(err => {
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                })
            props.toggle()
        }
    }

    return(
        <div>
            {props.type === 'add' ?
                <form onSubmit={handleSubmit} className='storySubmit' >
                    <h2>Add New Story</h2>
                    {(errorMessage) && <p style={{color: 'red'}}>{errorMessage}</p>}
                    <div className='storySubmitForm'>
                        <input 
                            name='title'
                            value={storyState.title}
                            onChange={handleChange}
                            placeholder='Title'
                            type="text"/>
                        <textarea 
                            name='summary'
                            className='summary'
                            value={storyState.summary}
                            onChange={handleChange}
                            placeholder='Summary'
                            type="text"/>
                        <button type='button' onClick={toggleGenres} >Choose Genre</button>
                    { toggleGenreButtons ? 
                        <div>
                            <button type='button' name='genre' value='Crime' onClick={handleGenre} >Crime</button>
                            <button type='button' name='genre' value='Mystery' onClick={handleGenre} >Mystery</button>
                            <button type='button' name='genre' value='Fantasy' onClick={handleGenre} >Fantasy</button>
                            <button type='button' name='genre' value='Romance' onClick={handleGenre} >Romance</button>
                            <button type='button' name='genre' value='Science Fiction' onClick={handleGenre} >Science Fiction</button>
                            <button type='button' name='genre' value='Western' onClick={handleGenre} >Western</button>
                            <button type='button' name='genre' value='Horror' onClick={handleGenre} >Horror</button>
                            <button type='button' name='genre' value='Inspirational' onClick={handleGenre} >Inspirational</button>
                            <button type='button' name='genre' value='Non-Fiction' onClick={handleGenre} >Non-Fiction</button>
                            <button type='button' name='genre' value='Biography' onClick={handleGenre} >Biography</button>
                        { toggleOtherGenre ?
                            <button type='button' name='genre' onClick={toggleOther} >Other</button>
                        :
                            <div>
                                <input 
                                    name='genre'
                                    value={uniqueGenre}
                                    onChange={handleUniqueGenre}
                                    placeholder='Genre'
                                    type="text"/>
                                <button type='button' onClick={toggleOther} >Add Other</button>
                            </div>
                        }
                        </div>
                    :
                        <></>
                    }
                    <button>{props.button}</button>
                    </div>
                </form>
                :
                <form onSubmit={handleSubmit} className='storyEdit' >
                    <h2>{props.story.title}</h2>
                    {(errorMessage) && <p style={{color: 'red'}}>{errorMessage}</p>}
                    Title
                    <input 
                        name='title'
                        value={storyState.title}
                        onChange={handleChange}
                        placeholder='Title'
                        type="text"/>
                    Summary
                    <input 
                        name='summary'
                        value={storyState.summary}
                        onChange={handleChange}
                        placeholder='Summary'
                        type="text"/>
                    <button type='button' onClick={deleteGenres} >Delete Genres</button>
                    <button type='button' onClick={toggleGenres} >Add Genre</button>
                    { toggleGenreButtons ? 
                        <div>
                            <button type='button' name='genre' value='Crime' onClick={handleGenre} >Crime</button>
                            <button type='button' name='genre' value='Mystery' onClick={handleGenre} >Mystery</button>
                            <button type='button' name='genre' value='Fantasy' onClick={handleGenre} >Fantasy</button>
                            <button type='button' name='genre' value='Romance' onClick={handleGenre} >Romance</button>
                            <button type='button' name='genre' value='Science Fiction' onClick={handleGenre} >Science Fiction</button>
                            <button type='button' name='genre' value='Western' onClick={handleGenre} >Western</button>
                            <button type='button' name='genre' value='Horror' onClick={handleGenre} >Horror</button>
                            <button type='button' name='genre' value='Inspirational' onClick={handleGenre} >Inspirational</button>
                            <button type='button' name='genre' value='Non-Fiction' onClick={handleGenre} >Non-Fiction</button>
                            <button type='button' name='genre' value='Biography' onClick={handleGenre} >Biography</button>
                        { toggleOtherGenre ?
                            <button type='button' name='genre' onClick={toggleOther} >Other</button>
                        :
                            <div>
                                <input 
                                    name='genre'
                                    value={uniqueGenre}
                                    onChange={handleUniqueGenre}
                                    placeholder='Genre'
                                    type="text"/>
                                <button type='button' onClick={toggleOther} >Add Other</button>
                            </div>
                        }
                        </div>
                    :
                        <></>
                    }
                    <button>{props.button}</button>
                </form>
                }
        </div>
    )
}

export default withRouter(AddStoryForm)