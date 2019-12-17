import React from 'react'
import '../styling/outlinesStyles.scss'

export default function Outline (props) {
    console.log(props.outline)
    return (
        <div className='outlineComponent'>
            <h3>{props.outline.title}</h3>
            <p>{props.outline.partOne}</p>
            <p>{props.outline.partTwo}</p>
            <p>{props.outline.partThree}</p>
            <p>{props.outline.partFour}</p>
            <p>{props.outline.partFive}</p>
            <p>{props.outline.partSix}</p>
            <p>{props.outline.partSeven}</p>
        </div>
    )
}