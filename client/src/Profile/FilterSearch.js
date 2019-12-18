import React, { useState, useContext, useEffect } from 'react'
import { WriterContext } from '../ContextProvider'

export default function FilterSearch(props) {
    const [searchState, setSearchState] = useState({
        initialItems: [],
        items: []
    })

    const filterList = e => {
        let items = searchState.initialItems
        items = items.filter((item) => {
            return item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        })
        setSearchState({items: items})
    }

    useEffect(() => {
        return setSearchState({
            initialItems: props.content,
            items: props.content
        })
    }, [])
    console.log(props.content)
    console.log(searchState.items)

    const giveMeMyFuckingData = () => {
            setSearchState({
                initialItems: props.content,
                items: props.content
            })
            console.log(props.content)
            console.log(searchState.items)
    }

    return(
        <div>
            <div>
                <input style={{margin: '0 80px'}} type="text" name="story" onChange={filterList} onClick={giveMeMyFuckingData}/>
                <div>
                    {
                        searchState.items.map((story => {
                            return <div key={story._id}>{story.title}</div>
                        }))
                    }
                </div>
            </div>
        </div>
    )
}