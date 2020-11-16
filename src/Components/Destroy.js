import React, {useState} from 'react'


function Destroy(props) {

    /* const [prevState, changePrevState] = useState(null)

    function undoLastChange() {
        console.log(prevState)
        if (prevState)
            props.updateGroup(prevState)
    } */

    function deleteSelected() {
        if(props.selectedCreatures.length >= props.group.creatures.length) {
            alert("Groups must have at least 1 creature!")
            return
        }
        
        let newGroup = JSON.parse(JSON.stringify(props.group))
        let newCreatures = newGroup.creatures

        newGroup.creatures = newCreatures.filter( (val, index) => !props.selectedCreatures.includes(index))

        newGroup.initialSize -= props.selectedCreatures.length
        props.changeSelectedCreatures([])
       
        props.updateGroup(newGroup)
        
    }

    function deleteGroup() {
        
        let index = null;
        
        let i;
        for( i in props.groupData) {
            if (props.groupData[i].key === props.group.key)
                index = i;
        }

        
        let newList = props.groupData
        newList.splice(index,1)
        props.updateGroup(newList)
    }


    switch(props.menu) {
        // Show button to open this component and hide all others
        case 0:
            return(
                    <button onClick={() => props.updateMenu(4)} >
                        Destroy
                    </button>
            )
        
        //Show Menu for Destroy
        case 4:
            return(
                <div>
                    <button onClick={() => deleteSelected()}>
                        Destroy Selected
                    </button>
                    <br />
                    <button onClick={() => deleteGroup()}>
                        Delete Group
                    </button>
                    <br />
                    <button onClick={() => props.updateMenu(0)}>
                        Back
                    </button>  
                       
                            
                    
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



export default Destroy