import React, { useState } from 'react'
import AttackResults from './AttackResults'
import SmallFunctions from '../Functions/SmallFunctions'

function WeaponAttackSingle(props){

    const attack = props.attack
    const [attkMod, changeAttkMod] = useState(0)
    const [targetAC, changeTargetAC] = useState(15)
    const [finalDamage, changeFinalDamage] = useState(0)
    


   function rollAttacks() {
        
        let mainResults = []
        let rolls = SmallFunctions.rollDice(props.rolltype, props.numAttackers)
        
        
        for (let i=0; i < props.numAttackers; i++) {
            
            let roll = rolls[i]
            mainResults.push([roll])
            if (props.crit && roll === 20) {
                console.log("CRIT")
                var number = Math.floor(Math.random()*attack.damDie+1)
                number = number*2
                number = number + attack.damBonus
                mainResults[i].push(number)
                mainResults[i][0] += 1; //make the roll equal to 21 to tell the results it is actually a crit
            }
            else if ( (roll + attack.bonus + attkMod) >= targetAC) {
                
                mainResults[i].push(Math.floor(Math.random()*attack.damDie + attack.damBonus + 1))
            }
            else {
               
               mainResults[i].push(0) 
            }

            mainResults[i].push(true)
        }

        changeFinalDamage( mainResults.reduce((sum, e) => sum + Number(e[1]), 0 ) )
        props.changeResults(mainResults)
    } 

    return (
        <div>
        {attack.saving ?
            
            <div>
                
            </div>
            :
        
            <div>
            AC of Target:<input type="number" value={targetAC} onChange={(e)=> changeTargetAC(Number(e.target.value))} />
            Additional Attack Modifier <input type="number" value={attkMod} onChange={(e) => changeAttkMod(Number(e.target.value))} />
            <button type="button" onClick={() => rollAttacks() } >Roll Attacks</button>
            
            <AttackResults finalDamage={finalDamage} key={String(finalDamage) + Math.random()}  type={attack.type} />
            
            </div>
        }
        </div>
    )
}




export default WeaponAttackSingle