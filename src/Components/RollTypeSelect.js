import React from 'react'

// Function will take the state of rolltype and the function changeRollType from parent component and display a set of three options for it. 
function RollTypeSelect (props) {

    let rolltype = props.rolltype
    const changeRolltype = props.changeRolltype
    let desig = Math.random() *1000

    return (
        <span>
            <input type="radio" name={desig+"rolltype"} id="Normal" value="Normal" checked={rolltype === "Normal"} onChange={()=>changeRolltype("Normal")}/>
                <label htmlFor="Normal">{rolltype ==="Normal" ? <u>Normal</u>:"Normal"}</label>
                <br />
            <input type="radio" name={desig+"rolltype"} id="Advantage" value="Advantage" checked={rolltype === "Advantage"} onChange={()=>changeRolltype("Advantage")}/>
                <label htmlFor="Advantage">{rolltype ==="Advantage" ? <u>Advantage</u>:"Advantage"}</label>
                <br />
            <input type="radio" name={desig+"rolltype"} value="Disadvantage" checked={rolltype === "Disadvantage"} onChange={()=>changeRolltype("Disadvantage")}/>
                <label htmlFor="Disadvantage">{rolltype ==="Disadvantage" ? <u>Disadvantage</u>:"Disadvantage"}</label>
        </span>
    )
}

export default RollTypeSelect

