import React from 'react'




function NumberInput(props) {

    const data = props.data

   

    return (
    <div>
        <input type="number" value={data} onChange={(e)=> props.change(e.target.value,props.part)}/>
    </div>
    )
}

export default NumberInput