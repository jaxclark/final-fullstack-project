import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { storiesAxios } from '../ContextProvider'

function SingleStory(props) {
    const [singleStory, setSingleStory] = useState([])

    useEffect(() => {
        getSingleStory()    
    }, [])
    
    const getSingleStory = () => {
        return storiesAxios.get(`/writer/story/${props.match.params.storyId}`)
        .then(res => {
            setSingleStory(res.data)
            return res
        })
    }
    const genreArray = singleStory.genre
    console.log(genreArray)
    const mappedGenres = genreArray && genreArray.map(item => {
        for(let i = 0; i < genreArray.length; i++) {
            return <div>{item}</div>
        }
    })
    
    const wholeStoryArray = Object.entries(singleStory)
    console.log(wholeStoryArray)
    // if (wholeStoryArray.length){
    //     let genre = wholeStoryArray.shift()
    //     wholeStoryArray.splice(3, 0, genre)
    // }
    const mappedStoryTitle = wholeStoryArray && wholeStoryArray.map(function([key, value]) {
                return (
                    <div>
                        <div>{key === 'title' && value}</div>
                        <div>
                            {key === 'genre' ? value.map(cat => <div>{cat}</div>) : ''}
                        </div>
                        <div>{key === 'summary' && value}</div>
                    </div>
                )

    })

    const mappedStorySummary = wholeStoryArray && wholeStoryArray.map(([key, value]) => 
        <div>{key === 'summary' && value}</div>
    )

    return(
        <div>
            <div>{mappedStoryTitle}</div>
            {/* <div>{mappedGenres}</div> */}
            {/* <div>{mappedStorySummary}</div> */}
        </div>
    )
}

export default withRouter(SingleStory)