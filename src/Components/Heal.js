import React, {useState} from 'react'
import SmallFunctions from '../Functions/SmallFunctions'



function Heal(props) {

    const aliveCreatures = SmallFunctions.numAboveZero(props.group.creatures)
    const [prevState, changePrevState] = useState(null)
    const [amount, changeAmount] = useState(1)
    function undoLastChange() {
        console.log(prevState)
        if (prevState)
            props.updateGroup(prevState)
    }

    function addMembers() {
        let newGroup = JSON.parse(JSON.stringify(props.group))
        for (let i = 1; i <= amount; i++)
            newGroup.creatures.push(newGroup.creatureHp)

        newGroup.initialSize += amount;
        props.updateGroup(newGroup)
    }

    function healSelected() {
        let newGroup = JSON.parse(JSON.stringify(props.group))
        let newCreatures = newGroup.creatures
        let i;
        for (i in props.selectedCreatures) {
            newCreatures[i] = props.group.creatureHp
        }

        
        props.updateGroup(newGroup)
    }


    switch(props.menu) {
        // Show button to open this component and hide all others
        case 0:
            return(
                    <button onClick={() => props.updateMenu(3)} >
                        Heal
                    </button>
            )
        
        //Show Menu for attacking, toggling between attacking a target or group with singleAttack
        case 3:
            return(
                <div>
                    <button onClick={() => addMembers()}>
                        Reinforce:
                    </button>
                    <input type="number" min={1} value={amount} onChange={(e) => changeAmount(e.target.value)}></input>
                    <button onClick={ ()=> healSelected()}>
                        Heal Selected:
                    </button>
                    <button onClick={() => props.updateMenu(0)}>
                            Back
                        </button> <br />    
                       
                            
                    
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



export default Heal