import React, {useState} from 'react'
import SmallFunctions from '../Functions/SmallFunctions'



function Heal(props) {

    const aliveCreatures = SmallFunctions.numAboveZero(props.group.creatures)
    const [prevState, changePrevState] = useState(null)

    function undoLastChange() {
        console.log(prevState)
        if (prevState)
            props.updateGroup(prevState)
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