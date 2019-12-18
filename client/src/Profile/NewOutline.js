import React from 'react'
import AddOutlineForm from './AddOutlineForm'
import '../styling/outlinesStyles.scss'
import Menu from './Menu'

export default function NewOutline() {
    return(
        <div className='newOutline'>
            <Menu />
            <AddOutlineForm />
        </div>
    )
}