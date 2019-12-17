import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { storiesAxios, WriterContext } from '../ContextProvider'

function SingleStory(props) {
    const { editStory, deleteStory } = useContext(WriterContext)
    const [singleStory, setSingleStory] = useState([])

    const [toggled, setToggled] = useState(true)
    const [uniqueGenre, setUniqueGenre] = useState('')
    const [toggleOtherGenre, setOtherToggle] = useState(true)
    const [toggleGenreButtons, setToggleGenres] = useState(false)
    const [errorMessage, setError] = useState('')

    const [storyState, setStoryState] = useState({
        title: '',
        genre: '',
        summary: '',
        user: JSON.parse(localStorage.getItem("user"))
    })

    useEffect(() => {
        getSingleStory()
        updateStory()
    }, [])

    const getSingleStory = () => {
        return storiesAxios.get(`/writer/story/${props.match.params.storyId}`)
        .then(res => {
            setSingleStory(res.data)
            return res
        })
    }

    const updateStory = () => {
        setStoryState(singleStory)
    }

    const toggle = () => {
        setToggled(prev => {
            return !prev
        })
        updateStory()
        getSingleStory()
    }

    const toggleGenres = () => {setToggleGenres(prev => !prev)}

    const toggleOther = () => {
        setOtherToggle(prev => {
            return !prev
        })
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

    const handleSubmit = e => {
        e.preventDefault()
        editStory(singleStory._id, storyState)
            .catch(err => {
                console.log(err.response.data.message)
                setError(err.response.data.message)
            })
        toggle()
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



    const wholeStoryArray = Object.entries(singleStory)

    //Marcus code for whole thing, doesn't work for order because objects don't always come out in same order
    // if (wholeStoryArray.length){
    //     let genre = wholeStoryArray.shift()
    //     wholeStoryArray.splice(3, 0, genre)
    // }
    // const mappedSingleStory = wholeStoryArray && wholeStoryArray.map(function([key, value]) {
    //             return (
    //                 <div>
    //                     <div>{key === 'title' && value}</div>
    //                     <div>
    //                         {key === 'genre' ? value.map(cat => <div>{cat}</div>) : ''}
    //                     </div>
    //                     <div>{key === 'summary' && value}</div>
    //                 </div>
    //             )
    // })

    // const mappedStorySummary = wholeStoryArray && wholeStoryArray.map(([key, value]) => 
    //     <div>{key === 'summary' && value}</div>
    // )
    // const mappedStoryTitle = wholeStoryArray && wholeStoryArray.map(([key, value]) => 
    //     <div>{key === 'title' && value}</div>
    // )
    const genreArray = singleStory.genre
    const mappedGenres = genreArray && genreArray.map(item => {
        for(let i = 0; i < genreArray.length; i++) {
            return <div>{item}</div>
        }
    })

    return(
        <div className='singleStory'>
            {toggled ? 
            <>
                <button onClick={toggle}>Edit</button>
                <button onClick={() => {deleteStory(singleStory._id)}}>Delete</button>
            </>
            :
                <form>
                    <input 
                        name='title'
                        onChange={handleChange} 
                        value={storyState.title && storyState.title} 
                        placeholder='Title'
                        type="text"/>
                    <input 
                        name='summary'
                        onChange={handleChange} 
                        value={storyState.summary && storyState.summary} 
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
                    <button onClick={handleSubmit}>Save</button>
                    {(errorMessage) && <p style={{color: 'red'}}>{errorMessage}</p>}
                </form>
            }
            <div>{singleStory.title}</div>
            <div>{mappedGenres}</div>
            <div>{singleStory.summary}</div>
        </div>
    )
}

export default withRouter(SingleStory)