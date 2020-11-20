import React, { useState } from 'react'
import TargetType from './TargetType'
import RollTypeSelect from './RollTypeSelect'
import SaveRuleSelect from './SaveRuleSelect'
import SmallFunctions from '../Functions/SmallFunctions'
import ApplyDamage from './ApplyDamage'

function TakeDamage(props) {

    const [targetType, changeTargetType] = useState("random") //Target random hp or highest or lowest. Note that selected creatures is different bool
    const [damage, changeDamage] = useState(1)
    const [bleedthrough, changeBleedthrough] = useState(false)
    const [numTargets, changeNumTargets] = useState(1)
    const [selection, changeSelection] = useState(false)
    const [prevState, changePrevState] = useState(null)
    const [aoe, changeAoe] = useState(false)
    const [saveDC, changeSaveDC] = useState(10)
    const [saveRule, changeSaveRule] = useState("Half")
    const [saveType, changeSaveType] = useState("DEX")
    const [rolltype, changeRolltype] = useState("Normal")
    const [deadGuys, changeDeadGuys] = useState(null)
    

    const aliveCreatures = SmallFunctions.numAboveZero(props.group.creatures)
    const maxNumAffected = Math.min(aliveCreatures, numTargets)

    const SaveOptions = []
    for (var type in props.group.Saves) {
        SaveOptions.push(<option value={type} key={type} >{type}: {props.group.Saves[type]}</option>)
    }
    SaveOptions.push(<option key="NUL" value={0}>{"NUL"}: +0</option>)


    function undoLastChange() {
        if (prevState)
            props.updateGroup(prevState)
    }


    

    //Display Return
    switch(props.menu) {
        case 0:
            return(
                <button onClick={() => props.updateMenu(2)}>
                    Defend
                </button>
            )
        case 2:
            return(
                <div>
                    <button onClick={() => changeAoe(!aoe)} >
                        {aoe ?  "Area of Effect Damage": "Damage Single Target"}
                    </button> <br />
                    <button onClick={() => props.updateMenu(0)}>
                        Back
                    </button> 

                    <TargetType targetType={targetType} change={changeTargetType} />
                    <strong> ||</strong> Selected Creatures Only? <input type="checkbox" checked={selection} onChange={() => changeSelection(!selection)} /> 
                    <br/>
                    
                    
                    
                    {aoe ? 
                        <div>
                            <SaveRuleSelect saveRule={saveRule} changeSaveRule={changeSaveRule} />
                            { saveRule !== "None" ?    
                                <span>
                                    Saving Throw DC: <input type="number" value={saveDC} onChange={ (event) => changeSaveDC(Number(event.target.value)) } /> 
                                    Type: <select value={saveType} onChange={(event) => changeSaveType(event.target.value)}>
                                        { SaveOptions }
                                        </select>
                                    <RollTypeSelect rolltype={rolltype} changeRolltype={changeRolltype} />
                                    <br />
                                </span>
                                :
                                <span> No saving throws will be rolled. <br /></span> 
                            }
                            
                            How Many Creatures Affected?
                                <input type="range" name="affectedCreatures" min="0"  max={aliveCreatures} value={numTargets} onChange={(e) => changeNumTargets(Number(e.target.value))} /> 
                                {maxNumAffected}
                                <br />
                                </div>
                        :
                        <div>
                            Bleedthrough? 
                            <input type="checkbox" name="bleedthrough" checked={bleedthrough} onChange={() => changeBleedthrough(!bleedthrough)} /> 
                            {bleedthrough ? 
                                <div>Max Additional Targets Damaged:
                                <input type="number" name="numTargets" min="0" max={aliveCreatures-1} value={numTargets} onChange={(e)=>changeNumTargets(Number(e.target.value))} />  </div>
                                :
                                <div></div>
                            }
                        </div>
                    }

                    How much Damage?
                    <input type="number" value={damage} onChange={(e)=>changeDamage(Number(e.target.value))} /> <br />
                    

                    <ApplyDamage group={props.group} damage={damage} bleedthrough={bleedthrough} numTargets={numTargets} selection={selection} selectedCreatures={props.selectedCreatures} targetType={targetType} aoe={aoe} 
                                    saveRule={saveRule} buttonText="Apply Damage" saveDC={saveDC} saveType = {saveType} changeDeadGuys={changeDeadGuys}
                                   changeRollResults={props.changeResults} changePrevState={changePrevState} updateGroup={props.updateGroup} />

                    <button onClick={() => undoLastChange()} >
                        Undo Damage
                    </button>

                    <br />
                    {deadGuys > 0 ?  <b className="fade">{deadGuys} Dead </b> :
                                                <span></span>}
                   
                </div>
            )
        default: 
            return(
                <span>
                    
                </span>
            )
    }
    
}

export default TakeDamage