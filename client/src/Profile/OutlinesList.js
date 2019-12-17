import React, { useContext, useEffect } from 'react'
import Outline from './Outline'
import AddOutlineForm from './AddOutlineForm'
import { WriterContext } from '../ContextProvider'
import { withRouter } from 'react-router-dom'

function OutlinesList(props) {
    const { outlines, getOutlines, addOutline, editOutline, deleteOutline } = useContext(WriterContext)

    useEffect(() => {
        getOutlines()
    }, [])

    const mappedOutlines = outlines.map(outline => 
            <Outline 
            key={outline._id}
            outline={outline}
            editOutline={editOutline}
            deleteOutline={deleteOutline}
            />
    )
    
    const handleClick = () => {
        props.history.push('/newoutline/')
    }

    return(
        <div className='outlineList'>
            <button onClick={handleClick}>New Outline</button>
            {mappedOutlines}
        </div>
    )
}

export default withRouter(OutlinesList)