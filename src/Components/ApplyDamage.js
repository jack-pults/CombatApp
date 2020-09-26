import React from 'react'
import SmallFunctions from '../Functions/SmallFunctions'

function ApplyDamage(props) {
    //Take several options and types and change the creature array and rollResults array. 
    // Props: group, damage, bleedthrough, numTargets, selection, selectedCreatures, targetType, aoe, saveRule, buttonText, changeRollResults, changePrevState, updateGroup
    // Optional: secondGroup, selectedAttack, numAttackers, saveDC, saveType
    function doDamage() {
        let newGroup = {}
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
        let sortedRolls = []

        

        if (!props.aoe && !props.secondGroup) { //If doing single target damage
            let  remainder = props.damage;
            if (props.bleedthrough) targets += 1;

            while (nonzeros.length > 0 && targets > 0 && remainder > 0) {

                if(newGroup.creatures[nonzeros[0]] >= remainder){
                    newGroup.creatures[nonzeros[0]] -= remainder
                    remainder = 0;
                }
                else{
                    remainder -= newGroup.creatures[nonzeros[0]]
                    newGroup.creatures[nonzeros[0]] = 0
                }
                nonzeros.splice(0, 1)
                targets -= 1;    
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
                        newGroup.creatures[nonzeros[0]] = Math.max( 0 , newGroup.creatures[nonzeros[0]] - props.damage )
                    else if (props.saveRule === "Half")
                        newGroup.creatures[nonzeros[0]] = Math.max( 0 , newGroup.creatures[nonzeros[0]] - Math.floor(props.damage / 2 ))
                    
                    sortedRolls.push([nonzeros[0], rollResults[0]])
                    rollResults.splice(0,1)
                    nonzeros.splice(0,1)
                    targets -= 1;
                }
                

            }
            else { //if group attack
               nonzeros = nonzeros.splice(0, targets)
               console.log(nonzeros)
               while (rollResults.length > 0 && nonzeros.length > 0) {
                   let newDamage = props.selectedAttack.damBonus
                   let victim = Math.floor(Math.random()*nonzeros.length)
                   for (let i = 0; i <= props.selectedAttack.numDie; i++) {
                       newDamage += Math.floor(Math.random() * props.selectedAttack.damDie)
                   }
                    if(props.selectedAttack.saving) {
                        if(rollResults[0] + newGroup.Saves[props.selectedAttack.savingType] < props.selectedAttack.DC ) {
                            newGroup.creatures[nonzeros[victim]] = Math.max(0, newGroup.creatures[nonzeros[victim]] - newDamage)
                        }
                    }
                    else {
                        if( rollResults[0] + props.selectedAttack.bonus >= newGroup.armorClass ) {
                            newGroup.creatures[nonzeros[victim]] = Math.max(0, newGroup.creatures[nonzeros[victim]] - newDamage)
                        }
                    }

                    sortedRolls.push( [nonzeros[victim], rollResults[0]] )
                   if(newGroup[nonzeros[victim]] === 0) nonzeros.splice(victim, 1)
                   rollResults.splice(0,1) 

               } 
            }
        }

        rollResults = sortedRolls.sort( (a,b) => a[0] - b[0])
        console.log(rollResults)
        props.changeRollResults(rollResults)
        props.updateGroup(newGroup)    
    }


    return <button onClick={() => doDamage()}>
        {props.buttonText}
        </button>

}

export default ApplyDamage