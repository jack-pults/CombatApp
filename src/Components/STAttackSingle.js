import React, { useState } from 'react'
import AttackResults from './AttackResults.js'
import SmallFunctions from '../Functions/SmallFunctions'


function STAttackSingle(props){

    const attack = props.attack
    const [targetBonus, changeTargetBonus] = useState(0)
    const [finalDamage, changeFinalDamage] = useState(0)

    function rollSaves(){

      
        let rolls = SmallFunctions.rollDice(props.rolltype, props.numAttackers)
        
        let finalResults = []

        for (let i=0; i < props.numAttackers; i++) {
            let roll = rolls[i];
            finalResults.push([roll])  
            if ( (roll + targetBonus) < attack.DC ) {
                    
                    finalResults[i].push(Math.floor(Math.random()*attack.damDie + attack.damBonus + 1))
                }
            else {
                   
                   finalResults[i].push(0) 
                }

            finalResults[i].push(false)
            }
        props.changeResults(finalResults)
        changeFinalDamage(finalResults.reduce((sum, e) => sum + Number(e[1]), 0 ) )
          
    }

    return (

        <div>
            {attack.saving? 
                <div>
                    
                    Target's Total Bonus:<input type="number" value={targetBonus} onChange={(e)=> changeTargetBonus(Number(e.target.value))} />
                    
                    <button type="button" onClick={() => rollSaves()}>Roll Saves</button>
                    
                    <AttackResults finalDamage={finalDamage} key={finalDamage + Math.random()} type={attack.type} />
                </div>
                :
                <div>
        
                </div>
            }
        </div>
    )
}




export default STAttackSingle