import React from 'react'
import SmallFunctions from '../Functions/SmallFunctions'

function ApplyDamage(props) {
    //Take several options and types and change the creature array and rollResults array. 
    // Props: group, damage, bleedthrough, numTargets, selection, selectedCreatures, targetType, aoe, saveRule, buttonText, changeRollResults, changePrevState, updateGroup
    // Optional: secondGroup, selectedAttack, numAttackers, saveDC, saveType
    function doDamage() {
        let newGroup = {}
        let deadGuys = 0;

        if (props.secondGroup) 
            newGroup = JSON.parse(JSON.stringify(props.secondGroup))
        else
            newGroup = JSON.parse(JSON.stringify(props.group))

        props.changePrevState(JSON.parse(JSON.stringify(newGroup)))

        
        //Make an array of keys with the values that are above 0
        let nonzeros = []
        if (props.selection) {
            newGroup.creatures.forEach((element, index) => {
                if (element > 0 && props.selectedCreatures.includes(index) )  
                    nonzeros.push(index) 
            })
        }
        else {
            newGroup.creatures.forEach((element, index) => {
                    if( element > 0 ) 
                        nonzeros.push(index)
                })
            }

        switch(props.targetType) {
            case "lowest":
                    nonzeros.sort(function(a, b){return newGroup.creatures[a]-newGroup.creatures[b]});
                    break;
            case "highest":
                    nonzeros.sort(function(a,b){return newGroup.creatures[b]-newGroup.creatures[a]})
                    break;
            default:  
                    nonzeros = SmallFunctions.shuffle(nonzeros)
                    break;
        }

        
        let  targets = props.numTargets;
        let rollResults = []
        let finalResults = []
        let damage = null;
        

        if (!props.aoe && !props.secondGroup) { //If doing single target damage
            let  remainder = props.damage;
            if (props.bleedthrough) targets += 1;

            while (nonzeros.length > 0 && targets > 0 && remainder > 0) {

                if(newGroup.creatures[nonzeros[0]] > remainder){
                    newGroup.creatures[nonzeros[0]] -= remainder
                    remainder = 0;
                }
                else if (newGroup.creatures[nonzeros[0]] === remainder) {
                    remainder = 0;
                    deadGuys += 1;
                    newGroup.creatures[nonzeros[0]] = 0;
                }
                else{
                    remainder -= newGroup.creatures[nonzeros[0]]
                    newGroup.creatures[nonzeros[0]] = 0
                    deadGuys += 1;
                }
                nonzeros.splice(0, 1)
                targets -= 1;  
                console.log("loop")  
            }    
            
        }
        else {
            if (props.saveRule === "None") 
                rollResults = []
            else if (props.aoe)
                rollResults = SmallFunctions.rollDice(props.rolltype, props.numTargets )
            else //If it is an attack group action
                rollResults = SmallFunctions.rollDice(props.rolltype, props.numAttackers )

            

            if(props.aoe) { //if aoe effect
                while (targets > 0 && nonzeros.length > 0) {
                    if (props.saveRule === "None" || rollResults[0] + newGroup.Saves[props.saveType]< props.saveDC ) 
                        damage = props.damage
                        
                    else if (props.saveRule === "Half")
                        damage = Math.floor(props.damage / 2)
                    
                    else 
                        damage = 0;
                        
                    newGroup.creatures[nonzeros[0]] = Math.max( 0 , newGroup.creatures[nonzeros[0]] - (damage))
                    if (newGroup.creatures[nonzeros[0]] === 0) deadGuys += 1;
                    finalResults.push([rollResults[0], damage, false])
                    rollResults.splice(0,1)
                    nonzeros.splice(0,1)
                    targets -= 1;
                }
                

            }
            else { //if group attack
               nonzeros = nonzeros.splice(0, targets)
               while (rollResults.length > 0 && nonzeros.length > 0) {
                   let newDamage = props.selectedAttack.damBonus
                   let victim = Math.floor(Math.random()*nonzeros.length)
                   finalResults.push([rollResults[0]])
                   for (let i = 0; i <= props.selectedAttack.numDie; i++) {
                       newDamage += Math.floor(Math.random() * props.selectedAttack.damDie)
                   }
                    if(props.selectedAttack.saving) {
                        if(rollResults[0] + newGroup.Saves[props.selectedAttack.savingType] < props.selectedAttack.DC ) {
                            newGroup.creatures[nonzeros[victim]] = Math.max(0, newGroup.creatures[nonzeros[victim]] - newDamage)
                            finalResults[finalResults.length-1].push(newDamage)
                            finalResults[finalResults.length-1].push(false)
                        }
                        else {
                            finalResults[finalResults.length-1].push(0)
                            finalResults[finalResults.length-1].push(false) 
                        }
                    }
                    else {
                        if( rollResults[0] + props.selectedAttack.bonus >= newGroup.armorClass ) {
                            newGroup.creatures[nonzeros[victim]] = Math.max(0, newGroup.creatures[nonzeros[victim]] - newDamage)
                            finalResults[finalResults.length-1].push(newDamage)
                            finalResults[finalResults.length-1].push(true)
                        }
                        else {
                            finalResults[finalResults.length-1].push(0)
                            finalResults[finalResults.length-1].push(true)
                        }
                    }

                   if(newGroup[nonzeros[victim]] === 0) nonzeros.splice(victim, 1)
                   rollResults.splice(0,1) 

               } 
            }
        }

        
        if(props.saveRule === "None")
            props.changeRollResults([])
        else
            props.changeRollResults(finalResults)
        props.updateGroup(newGroup)   
        props.changeDeadGuys(deadGuys) 
    }


    return <button onClick={() => doDamage()}>
        {props.buttonText}
        </button>

}

export default ApplyDamage