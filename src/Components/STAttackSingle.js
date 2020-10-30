import React, { useState } from 'react'
import AttackResults from './AttackResults.js'
import SmallFunctions from '../Functions/SmallFunctions'


function STAttackSingle(props){

    const attack = props.attack
    const [targetBonus, changeTargetBonus] = useState(0)
    const [rollResults, changeRollResults] = useState([])
    const [finalResults, changeFinalResults] = useState([])

    function rollSaves(){

      
        let results = []
        let rolls = SmallFunctions.rollDice(props.rolltype, props.numAttackers)
        changeRollResults(rolls)
        let finalResults = []

        for (let i=0; i < props.numAttackers; i++) {
            let roll = rolls[i];
            finalResults.push([roll])  
            if ( (roll + targetBonus) < attack.DC ) {
                    results.push(Math.floor(Math.random()*attack.damDie + attack.damBonus + 1))
                    finalResults[i].push(Math.floor(Math.random()*attack.damDie + attack.damBonus + 1))
                }
            else {
                   results.push(0)
                   finalResults[i].push(0) 
                }

            finalResults[i].push(false)
            }
        props.changeResults(finalResults)
        changeFinalResults(results)
          
    }

    return (

        <div>
            {attack.saving? 
                <div>
                    
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