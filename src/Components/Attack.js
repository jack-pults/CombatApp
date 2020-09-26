import React, {useState} from 'react'
import RollTypeSelect from './RollTypeSelect'
import SmallFunctions from '../Functions/SmallFunctions'
import STAttackSingle from './STAttackSingle'
import WeaponAttackSingle from './WeaponAttackSingle'
import TargetType from './TargetType'
import ApplyDamage from './ApplyDamage'
import MemberDisplay from './MemberDisplay'


function Attack(props) {

    const aliveCreatures = SmallFunctions.numAboveZero(props.group.creatures)
    const [chosenAttack, changeChosenAttack] = useState(0)
    const [numAttackers, changeNumAttackers] = useState(aliveCreatures)
    const [rolltype, changeRolltype] = useState("Normal")
    const [singleAttack, changeSingleAttack] = useState(true)

    const [targetGroup, changeTargetGroup] = useState(0)
    const [numTargets, changeNumTargets] = useState(1)
    const [targetType, changeTargetType] = useState("random")
    const [selection, changeSelection] = useState(false) //Boolean for target only selected creatures.
    const [rollResults, changeRollResults] = useState([])
    const [prevState, changePrevState] = useState(null)
    const [selectedTargets, changeSelectedTargets] = useState([])

    const maxNumAttackers = Math.min(numAttackers, aliveCreatures)
    const maxTargets = Math.min(numTargets, SmallFunctions.numAboveZero(props.groupData[targetGroup].creatures))

    const attack = props.group.attackOptions[chosenAttack]

    if (props.group.key === targetGroup) 
        changeTargetGroup(1)
    

    function makeAttackOptions(element, index) {
        return (<option value={index} key={index}> {element.name} </option>)    
    }

    function makeGroupChoices(element, index) {
        if (element === props.group)
            return null
        return (<option value={index} key={index} hidden={element.name === props.group.name}> {element.name} </option>)
    }

    function undoLastChange() {
        console.log(prevState)
        if (prevState)
            props.updateGroup(prevState)
    }



    switch(props.menu) {
        // Show button to open this component and hide all others
        case 0:
            return(
                    <button onClick={() => props.updateMenu(1)} >
                        Attacking
                    </button>
            )
        
        //Show Menu for attacking, toggling between attacking a target or group with singleAttack
        case 1:
            return(
                <div>
                    
                        <select value={chosenAttack} onChange={ (event) => changeChosenAttack(Number(event.target.value))}>
                            {props.group.attackOptions.map( (e,i) => makeAttackOptions(e,i) )}
                        </select>
                        <RollTypeSelect rolltype={rolltype} changeRolltype={changeRolltype} />
                        <br />

                        <label>How many are attacking:</label>
                        <input type="range" name="numAttackers" min="0"  max={aliveCreatures} value={numAttackers} onChange={(e) => changeNumAttackers(Number(e.target.value))} /> {maxNumAttackers}
                        <br />
                        
                        {singleAttack ? <div><STAttackSingle attack={attack} numAttackers={maxNumAttackers} rolltype={rolltype} /> 
                                        <WeaponAttackSingle attack={attack} numAttackers={maxNumAttackers} rolltype={rolltype} crit={props.crit} /> </div>
                                    :
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
                                        <input type="range" name="numTargets" min={1} max={ SmallFunctions.numAboveZero(props.groupData[targetGroup].creatures)} value={numTargets} onChange={(e)=>changeNumTargets(Number(e.target.value))} /> {maxTargets}
                                        <ApplyDamage group={props.group} numTargets={maxTargets} selection={selection}
                                                    selectedCreatures={selectedTargets} targetType={targetType} buttonText={"Attack!"}
                                                    changeRollResults={changeRollResults} changePrevState={changePrevState}
                                                    updateGroup={props.updateGroup} secondGroup={props.groupData[targetGroup]}
                                                    selectedAttack={attack} numAttackers={numAttackers} />
                                        
                                        <MemberDisplay group={props.groupData[targetGroup]} selectedCreatures={selectedTargets} changeSelectedCreatures={changeSelectedTargets} />
                                        <button onClick={() => undoLastChange()}>
                                            Undo
                                        </button>
                                    </div>
                                    }
                       
                            
                    <button onClick={() => changeSingleAttack(!singleAttack)}>
                        {singleAttack ? "Attack another Group" : "Attack Single Target"}
                    </button>                    
                    <button onClick={() => props.updateMenu(0)}>
                        Back
                    </button>
                </div>
            )
        
        //If any other option is selected, show nothing.
        default: 
            return(
                <span>

                </span>
            )
    }

}



export default Attack