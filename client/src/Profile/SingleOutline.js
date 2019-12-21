import React, { useState, useContext, useEffect } from 'react'
import { outlinesAxios, WriterContext } from '../ContextProvider'
import { withRouter } from 'react-router-dom'
import Menu from './Menu'

function SingleOutline(props) {
    const { editOutline, deleteOutline } = useContext(WriterContext)
    const [singleOutline, setSingleOutline] = useState([])
    const [outlineType, setOutlineType] = useState('')

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

    const findOutlineFormat = () => {
        if(singleOutline.partFour && singleOutline.partFour  !== '') {
            setOutlineType('sevenPoint')
        } else if(singleOutline.partFive && singleOutline.partFive !== '') {
            setOutlineType('sevenPoint')
        } else if(singleOutline.partSix && singleOutline.partSix !== '') {
            setOutlineType('sevenPoint')
        } else if(singleOutline.partSeven && singleOutline.partSeven !== '') {
            setOutlineType('sevenPoint')
        } else {
            setOutlineType('threeAct')
        }
        handleToggle()
    }

    const handleOutlineType = e => {
        const {value} = e.target
        setOutlineType(value)
    }

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

    const handleDelete = (Id) => {
        deleteOutline(Id)
        props.history.push(`/stories`)
    }

    return(
        <div className='singleOutline'>
            <Menu />
            {!toggle ?
            <div className='singleOutlineContainer'>
                <div className='singleOutlineDiv'>
                    <h2>{singleOutline.title}</h2>
                    {singleOutline.partOne && <p>{singleOutline.partOne}</p>}
                    {singleOutline.partTwo && <p>{singleOutline.partTwo}</p>}
                    {singleOutline.partThree && <p>{singleOutline.partThree}</p>}
                    {singleOutline.partFour && <p>{singleOutline.partFour}</p>}
                    {singleOutline.partFive && <p>{singleOutline.partFive}</p>}
                    {singleOutline.partSix && <p>{singleOutline.partSix}</p>}
                    {singleOutline.partSeven && <p>{singleOutline.partSeven}</p>}
                </div>
                <div className='singleOutlineButtons'>
                    <button onClick={findOutlineFormat}>Edit</button>
                    <button onClick={() => {handleDelete(singleOutline._id)}}>Delete</button>
                </div>
            </div>
            :
                <div className='addOutlineDiv'>
                <form className='addOutlineForm' onSubmit={handleSubmit}>
                <h2>Add New Outline</h2>
                <select onChange={handleOutlineType} className='addOutlineSelect'>
                    <option value="threeAct">Change Outline Format</option>
                    <option value="threeAct">Three Act Structure</option>
                    <option value="sevenPoint">Seven Point System</option>
                </select>
                {outlineType === 'sevenPoint' ? 
                <>
                    <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                    <textarea onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Hook'/>
                    <textarea onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Plot Twist One'/>
                    <textarea onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Pinch One'/>
                    <textarea onChange={handleChange} value={outlineState.partFour} type="text" name='partFour' placeholder='Midpoint'/>
                    <textarea onChange={handleChange} value={outlineState.partFive} type="text" name='partFive' placeholder='Pinch Two'/>
                    <textarea onChange={handleChange} value={outlineState.partSix} type="text" name='partSix' placeholder='Plot Twist Two'/>
                    <textarea onChange={handleChange} value={outlineState.partSeven} type="text" name='partSeven' placeholder='Resolution'/>
                    <div className='addOutlineButton'>
                        <button>Submit</button>
                    </div>
                </>
                :
                <>
                    <input onChange={handleChange} value={outlineState.title} type="text" name='title' placeholder='Title'/>
                    <textarea onChange={handleChange} value={outlineState.partOne} type="text" name='partOne' placeholder='Act One'/>
                    <textarea onChange={handleChange} value={outlineState.partTwo} type="text" name='partTwo' placeholder='Act Two'/>
                    <textarea onChange={handleChange} value={outlineState.partThree} type="text" name='partThree' placeholder='Act Three'/>
                    <div className='addOutlineButton'>
                        <button>Save</button>
                    </div>
                </>
                }
            </form>
                </div>
            }
        </div>
    )
}

export default withRouter(SingleOutline)