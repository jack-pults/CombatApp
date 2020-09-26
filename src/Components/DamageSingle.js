import React, { useState } from 'react'

function DamageSingle(props) {

    const [targetType, changeTargetType] = useState("random")
    const [damage, changeDamage] = useState(1)
    const [bleedthrough, changeBleedthrough] = useState(false)
    const [numTargets, changeNumTargets] = useState(1)
    const [selection, changeSelection] = useState(false)
    const [prevState, changePrevState] = useState(null)

    function applyDamage() {
        var newGroup = JSON.parse(JSON.stringify(props.group))
        var remainder = damage;
        var targets = 1;

        if (bleedthrough) targets += numTargets;
        //Make an array of keys with the values that are above 0
        var nonzeros = []
        
        if (selection) {
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


        while (nonzeros.length > 0 && targets > 0 && remainder > 0) {
             
            var nextTarget = 0;

            switch(targetType) {
                    case "lowest":
                        nonzeros.sort(function(a, b){return newGroup.creatures[a]-newGroup.creatures[b]});
                        break;
                    case "highest":
                        nonzeros.sort(function(a,b){return newGroup.creatures[b]-newGroup.creatures[a]})
                        break;
                    default:  
                        nextTarget = Math.floor(Math.random()*nonzeros.length)
                        break;
                }

                if(newGroup.creatures[nonzeros[nextTarget]] >= remainder){
                    newGroup.creatures[nonzeros[nextTarget]] -= remainder
                    remainder = 0;
                }
                else{
                    remainder -= newGroup.creatures[nonzeros[nextTarget]]
                    newGroup.creatures[nonzeros[nextTarget]] = 0
                }
                nonzeros.splice(nextTarget, 1)
                targets -= 1;     
        }    
        
        changePrevState(props.group)
        props.updateGroup(newGroup)
            
    }

    function undoLastChange() {
        if (prevState)
            props.updateGroup(prevState)
    }
    

    //Display Return
    switch(props.menu) {
        case 0:
            return(
                <button onClick={() => props.updateMenu(3)}>
                    DamageSingle
                </button>
            )
        case 3:
            return(
                <div>
                    Select Target Type:
                    <input type="radio" name={props.group.name+"targetType"} value="random" checked={targetType === "random"} onChange={(e) => changeTargetType(e.target.value)} /> Random
                    <input type="radio" name={props.group.name+"targetType"} value="lowest" checked={targetType === "lowest"} onChange={(e) => changeTargetType(e.target.value)} /> Lowest HP
                    <input type="radio" name={props.group.name+"targetType"} value="highest" checked={targetType === "highest"} onChange={(e) => changeTargetType(e.target.value)} /> Highest HP
                   
                    <strong> ||</strong> Selected Creatures Only? <input type="checkbox" checked={selection} onChange={() => changeSelection(!selection)} /> 
                    <br/>
                    
                    How much Damage?
                    <input type="number" value={damage} onChange={(e)=>changeDamage(Number(e.target.value))} /> <br />
                    Bleedthrough? 
                    <input type="checkbox" name="bleedthrough" checked={bleedthrough} onChange={() => changeBleedthrough(!bleedthrough)} />
                    {bleedthrough ? 
                        <div>Max Additional Targets Damaged:
                        <input type="number" name="numTargets" value={numTargets} onChange={(e)=>changeNumTargets(Number(e.target.value))} />  </div>
                        :
                        <div></div>
                    }
                    

                    <button onClick={() => applyDamage()} >
                        Apply Damage
                    </button>

                    <button onClick={() => undoLastChange()} >
                        Undo Damage
                    </button>

                    
                   <button onClick={() => props.updateMenu(0)}>
                        Back
                    </button> 
                </div>
            )
        default: 
            return(
                <div>
                    
                </div>
            )
    }
    
}

export default DamageSingle