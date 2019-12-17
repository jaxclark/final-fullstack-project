import React, { useContext } from 'react'
import StoriesList from './StoriesList'
import { WriterContext } from '../ContextProvider'
import '../styling/storiesStyles.scss'

export default function() {
    const { user } = useContext(WriterContext)
    return(
        <div className='landingPage'>
            <h1>Username</h1>
            <StoriesList type='userPage' />
        </div>
    )
}