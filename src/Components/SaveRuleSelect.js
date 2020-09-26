import React from 'react'


function SaveRuleSelect(props) {

    let desig = Math.random() *1000
    return <div>
        Select Save Rule:
        <input type="radio" name={desig+"saveRule"} value="None" checked={props.saveRule === "None"} onChange={(e) => props.changeSaveRule(e.target.value)} /> No Save
        <input type="radio" name={desig+"saveRule"} value="Half" checked={props.saveRule === "Half"} onChange={(e) => props.changeSaveRule(e.target.value)} /> Save Halves
        <input type="radio" name={desig+"saveRule"} value="Negate" checked={props.saveRule === "Negate"} onChange={(e) => props.changeSaveRule(e.target.value)} /> Save Negates
        <br />
    </div>

}

export default SaveRuleSelect