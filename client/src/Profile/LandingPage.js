import React, { useContext } from 'react'
import StoriesList from './StoriesList'
import { WriterContext } from '../ContextProvider'

export default function() {
    const { user } = useContext(WriterContext)
    return(
        <div>
            <div>{`Successfully logged in`}</div>
            <div>On user landing page</div>
            <StoriesList />
        </div>
    )
}