import React from 'react'




function TextInput(props) {

    const data = props.data

   

    return (
    <div>
        <input type="text" value={data} onChange={(e)=> props.change(e.target.value)}/>
    </div>
    )
}

export default TextInput