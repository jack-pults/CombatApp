import React, { useState } from 'react'
import AttackResults from './AttackResults.js'
import SmallFunctions from '../Functions/SmallFunctions'


function STAttackSingle(props){

    const attack = props.attack
    const [targetBonus, changeTargetBonus] = useState(0)
    const [rollResults, changeRollResults] = useState([])
    const [finalResults, changeFinalResults] = useState([])

    function rollSaves(){

      
        var results = []
        var i;
        let rolls = SmallFunctions.rollDice(props.rolltype, props.numAttackers)
        changeRollResults(rolls)

        for (i=0; i < props.numAttackers; i++) {
            var roll = rolls[i];
                
            if ( (roll + targetBonus) < attack.DC ) {
                    results.push(Math.floor(Math.random()*attack.damDie + attack.damBonus + 1))
                }
            else {
                   results.push(0) 
                }
            }
        changeFinalResults(results)
          
    }

    return (

        <div>
            {attack.saving? 
                <div>
                    DC: {attack.DC} {attack.savingType} Save Damage: {attack.numDie}d{attack.damDie}+{attack.damBonus} Type: {attack.type}    
                    <br /> 
                    Target's Total Bonus:<input type="number" value={targetBonus} onChange={(e)=> changeTargetBonus(Number(e.target.value))} />
                    
                    <button type="button" onClick={() => rollSaves()}>Roll Saves</button>
                    {finalResults.length > 0 ? 
                        <AttackResults finalResults={finalResults} rolls={rollResults} type={attack.type} />
                        :
                        <div>Results Here</div>
                        }
                </div>
                :
                <div>
                </div>
            }
        </div>
    )
}




export default STAttackSingle