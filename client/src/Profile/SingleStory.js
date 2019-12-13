import React, { useState, useEffect, useContext} from 'react'
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
    console.log(Object.entries(singleStory))

    const mappedStory = Object.entries(singleStory).filter(([key, value]) => {
        // if(key === 'title') {
        //     return <div>{value}</div>
        // }
        if(key === 'genre') {
            return <div>{value[1]}</div>
        }
        // if(key === 'summary') {
        //     return <div>{value}</div>
        // }
    })

    return(
        <div>
            {mappedStory}
        </div>
    )
}

export default withRouter(SingleStory)