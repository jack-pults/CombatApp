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
    const [prevState, changePrevState] = useState(null)
    const [selectedTargets, changeSelectedTargets] = useState([])

    const maxNumAttackers = Math.min(numAttackers, aliveCreatures)
    let maxTargets = 0;
    if (props.groupData[targetGroup])
        maxTargets = Math.min(numTargets, SmallFunctions.numAboveZero(props.groupData[targetGroup].creatures))

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
                        Attack
                    </button>
            )
        
        //Show Menu for attacking, toggling between attacking a target or group with singleAttack
        case 1:
            return(
                <div>
                        <button onClick={() => changeSingleAttack(!singleAttack)}>
                            {singleAttack ? "Attack Group" : "Attack Single Target"}
                        </button>   <br />                 
                        <button onClick={() => props.updateMenu(0)}>
                            Back
                        </button> <br />
                    
                        <select value={chosenAttack} onChange={ (event) => changeChosenAttack(Number(event.target.value))}>
                            {props.group.attackOptions.map( (e,i) => makeAttackOptions(e,i) )}
                        </select>

                        {props.group.attackOptions[chosenAttack].saving ? 
                        <div>
                            DC: {attack.DC} {attack.savingType} Save Damage: {attack.numDie}d{attack.damDie}+{attack.damBonus} Type: {attack.type}    
                        </div> :
                        <div>
                        To Hit:{attack.bonus > 0 ? "+" : ""}{attack.bonus} Damage: {attack.numDie}d{attack.damDie}+{attack.damBonus} Type: {attack.type}
                        </div> }

                        <RollTypeSelect rolltype={rolltype} changeRolltype={changeRolltype} />
                        <br />

                        <label>How many are attacking:</label>
                        <input type="range" name="numAttackers" min="0"  max={aliveCreatures} value={numAttackers} onChange={(e) => changeNumAttackers(Number(e.target.value))} /> {maxNumAttackers}
                        <br />
                        
                        {singleAttack ? <div><STAttackSingle attack={attack} numAttackers={maxNumAttackers} rolltype={rolltype} changeResults={props.changeResults} /> 
                                        <WeaponAttackSingle attack={attack} numAttackers={maxNumAttackers} rolltype={rolltype} crit={props.crit} changeResults={props.changeResults} /> </div>
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
                                        {props.groupData[targetGroup] ? 
                                            <span>
                                            How many can be hit:
                                            <input type="range" name="numTargets" min={1} max={ maxTargets} value={numTargets} onChange={(e)=>changeNumTargets(Number(e.target.value))} /> {maxTargets}
                                            <ApplyDamage group={props.group} numTargets={maxTargets} selection={selection}
                                                        selectedCreatures={selectedTargets} targetType={targetType} buttonText={"Attack!"}
                                                        changeRollResults={props.changeResults} changePrevState={changePrevState}
                                                        updateGroup={props.updateGroup} secondGroup={props.groupData[targetGroup]}
                                                        selectedAttack={attack} numAttackers={numAttackers} />

                                            <button onClick={() => undoLastChange()}>
                                                Undo
                                            </button>
                                            
                                            <MemberDisplay group={props.groupData[targetGroup]} selectedCreatures={selectedTargets} changeSelectedCreatures={changeSelectedTargets} />
                                            </span>
                                        : 
                                            <span>No Target Selected</span>}
                                        
                                    </div>
                                    }
                       
                            
                    
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