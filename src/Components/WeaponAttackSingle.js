import React, { useState } from 'react'
import AttackResults from './AttackResults'
import SmallFunctions from '../Functions/SmallFunctions'

function WeaponAttackSingle(props){

    const attack = props.attack
    const [attkMod, changeAttkMod] = useState(0)
    const [targetAC, changeTargetAC] = useState(15)
    const [finalResults, changeFinalResults] = useState([])
    const [rollResults, changeRollResults] = useState([])

   function rollAttacks() {
        let results = []
        let i;
        let rolls = SmallFunctions.rollDice(props.rolltype, props.numAttackers)
        changeRollResults(rolls)
        
        for (i=0; i < props.numAttackers; i++) {
            
            let roll = rolls[i]
            
            if (props.crit && roll === 20) {
                console.log("CRIT")
                var number = Math.floor(Math.random()*attack.damDie+1)
                number = number*2
                number = number + attack.damBonus
                results.push(number)
                
            }
            else if ( (roll + attack.bonus + attkMod) >= targetAC) {
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
        {attack.saving ?
            
            <div></div>
            :
        
            <div>
            AC of Target:<input type="number" value={targetAC} onChange={(e)=> changeTargetAC(Number(e.target.value))} />
            Additional Attack Modifier <input type="number" value={attkMod} onChange={(e) => changeAttkMod(Number(e.target.value))} />
            <button type="button" onClick={() => rollAttacks() } >Roll Attacks</button>
            {finalResults.length > 0 ? 
                <AttackResults finalResults={finalResults} rolls={rollResults} type={attack.type} />
                :
                <div>Results Here</div>
                }
            </div>
        
        }
        </div>
    )
}




export default WeaponAttackSingle