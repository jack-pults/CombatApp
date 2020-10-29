import React from 'react'




function NumberInput(props) {

    const data = props.data

    function correctNumber(value) {
        if (value === 0 || value === "0") props.change(value, props.part)
        else props.change(Number(value), props.part)
    }

    return (
    <div>
        <input type="number" value={data} onChange={(e)=> correctNumber(e.target.value)}/>
    </div>
    )
}

export default NumberInput