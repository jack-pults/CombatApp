import React from 'react'

// Function will take the state of rolltype and the function changeRollType from parent component and display a set of three options for it. 
function RollTypeSelect (props) {

    let rolltype = props.rolltype
    const changeRolltype = props.changeRolltype
    let desig = Math.random() *1000

    return (
        <span>
            <input type="radio" name={desig+"rolltype"} id="Normal" value="Normal" checked={rolltype === "Normal"} onChange={()=>changeRolltype("Normal")}/>
                        Normal
            <input type="radio" name={desig+"rolltype"} id="Advantage" value="Advantage" checked={rolltype === "Advantage"} onChange={()=>changeRolltype("Advantage")}/>
                        Advantage
            <input type="radio" name={desig+"rolltype"} value="Disadvantage" checked={rolltype === "Disadvantage"} onChange={()=>changeRolltype("Disadvantage")}/>
                        Disadvantage 
        </span>
    )
}

export default RollTypeSelect

