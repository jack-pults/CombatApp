import React, { useState } from 'react'
import SaveBlock from './SaveBlock.js'
import HealthCard from './HealthCard'
import MemberDisplay from './MemberDisplay'
import SmallFunctions from '../Functions/SmallFunctions.js'
import Notes from './Notes'
import Attack from './Attack'
import TakeDamage from './TakeDamage.js'

function Group(props) {

    const group = props.group
    let aliveCreatures = SmallFunctions.numAboveZero(group.creatures)

    const [selectedCreatures, changeSelectedCreatures] = useState([])

    const [menu, changeMenu] = useState(0) //Using this to tell the interaction forms to either show a button to open their form, their form, or nothing. 
    //Menu 0 is show buttons. 1 is AttackSingle
    function updateMenu(selection) {
        changeMenu(selection)
    }

    function updateGroup(newGroup) {
        
        props.updateStats(newGroup)
    }
    

    return (
        <span className="group">
            <div className="memberDisplay"><MemberDisplay group={group} selectedCreatures={selectedCreatures} changeSelectedCreatures={changeSelectedCreatures} /> </div>
            
                <div className="centerColumn">{" " + group.name} 
                    <br />
                {aliveCreatures}/{group.initialSize} Creatures<br />
                <HealthCard group={group} /> AC: {group.armorClass} 
                <SaveBlock group={group}/> <br />
                
                
                
                <Attack group={group} menu={menu} updateMenu={updateMenu} crit={props.crit} groupData={props.groupData} updateGroup={updateGroup} />
                <TakeDamage group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} />
                    <br />
                </div>
          
            
            
                <Notes group={group} updateGroup={updateGroup} />
        </span>
    )
}

export default Group