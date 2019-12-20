import React, { useState, useContext, useEffect } from 'react'
import { outlinesAxios, WriterContext } from '../ContextProvider'
import { withRouter } from 'react-router-dom'
import Menu from './Menu'

function SingleOutline(props) {
    const { editOutline, deleteOutline } = useContext(WriterContext)
    const [singleOutline, setSingleOutline] = useState([])

    const [toggle, setToggle] = useState(false)

    const [outlineState, setOutlineState] = useState({
        title: '',
        partOne: '',
        partTwo: '',
        partThree: '',
        partFour: '',
        partFive: '',
        partSix: '',
        partSeven: '',
    })

    const {outlineId} = props.match.params
    console.log(outlineId)

    useEffect(() => {
        outlinesAxios.get(`/writer/outline/${outlineId}`)
            .then(res => {
                setSingleOutline(res.data)
            })
    }, [outlineId])

    function getSingleOutline() {
        outlinesAxios.get(`/writer/outline/${outlineId}`)
        .then(res => {
            setSingleOutline(res.data)
        })
    }

    const updateOutline = () => {
        setOutlineState(singleOutline)
    }

    const handleToggle = () => {
        setToggle(prev => {
            return !prev
        })
        updateOutline()
        getSingleOutline()
    }

    const handleChange = e => {
        const { name, value } = e.target
        setOutlineState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        editOutline(singleOutline._id, outlineState)
            .catch(err => {
                console.log(err.response.data.message)
            })
        handleToggle()
    }

    return(
        <div className='singleOutline'>
            <Menu />
            {!toggle ?
                <>
                <button onClick={handleToggle}>Edit</button>
                <button onClick={() => {deleteOutline(singleOutline._id)}}>Delete</button>
                </>
            :
                <form onSubmit={handleSubmit}>
                    <h4>Edit Outline</h4>
                    <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                    <input onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Part One'/>
                    <input onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Part Two'/>
                    <input onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Part Three'/>
                    <input onChange={handleChange} value={outlineState.partFour} type="text" name='partFour' placeholder='Part Four'/>
                    <input onChange={handleChange} value={outlineState.partFive} type="text" name='partFive' placeholder='Part Five'/>
                    <input onChange={handleChange} value={outlineState.partSix} type="text" name='partSix' placeholder='Part Six'/>
                    <input onChange={handleChange} value={outlineState.partSeven} type="text" name='partSeven' placeholder='Part Seven'/>
                    <button>Save</button>
                </form>
            }
            <div>{singleOutline.title}</div>
            <div>{singleOutline.partOne}</div>
            <div>{singleOutline.partTwo}</div>
            <div>{singleOutline.partThree}</div>
            <div>{singleOutline.partFour}</div>
            <div>{singleOutline.partFive}</div>
            <div>{singleOutline.partSix}</div>
            <div>{singleOutline.partSeven}</div>
        </div>
    )
}

export default withRouter(SingleOutline)