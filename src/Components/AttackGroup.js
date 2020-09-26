import React, { useState } from 'react'
import RollTypeSelect from './RollTypeSelect'
import SmallFunctions from '../Functions/SmallFunctions'
import MemberDisplay from './MemberDisplay'
import TargetType from './TargetType'


function AttackGroup(props) {
    
    const [targetGroup, changeTargetGroup] = useState(0)
    const [numTargets, changeNumTargets] = useState(1)
    const [targetType, changeTargetType] = useState("random")
    const [selection, changeSelection] = useState(false) //Boolean for target only selected creatures.

    //Prevent targeting self
    if (props.group.key === targetGroup) 
        changeTargetGroup(1)


    function makeGroupChoices(element, index) {
        if (element === props.group)
            return <div></div>
        return (<option value={index} key={index} hidden={element.name === props.group.name}> {element.name} </option>)
    }


    switch(props.menu) {
        case 0:
            return(
                <button onClick={() => props.updateMenu(2)}>
                    Attack Group
                </button>
            )
            
        case 2:
            return(
                <div>
                    <br />
                    <select value={targetGroup} onChange={ (event) => { changeTargetGroup(Number(event.target.value))
                                                                        changeNumTargets(0)}}>
                        {props.groupData.map( (e,i) => makeGroupChoices(e,i) )}
                    </select>
                    <TargetType targetType={targetType} change={changeTargetType} />
                    <strong> || </strong> Selected Creatures Only? <input type="checkbox" checked={selection} onChange={() => changeSelection(!selection)} /> 
                    <br/>
                    How many can be hit:
                    <input type="range" name="numTargets" min={1} max={ props.groupData[targetGroup] ? SmallFunctions.numAboveZero(props.groupData[targetGroup].creatures) : 0 } value={numTargets} onChange={(e)=>changeNumTargets(Number(e.target.value))} /> {numTargets}
        
                    <button onClick={() => props.updateMenu(0)}>
                        Back
                    </button>
                </div>
            )
        
        default: 
            return(
                <div>
                    
                </div>
            )
        
    }
    
}

export default AttackGroup