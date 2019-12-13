import React, { useContext, useEffect } from 'react'
import Outline from './Outline'
import AddOutlineForm from './AddOutlineForm'
import { WriterContext } from '../ContextProvider'

export default function OutlinesList() {
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

    return(
        <div>
            <AddOutlineForm addOutline={addOutline} />
            {mappedOutlines}
        </div>
    )
}