import React, { useState } from 'react'
import SaveBlock from './SaveBlock.js'
import HealthCard from './HealthCard'
import MemberDisplay from './MemberDisplay'
import SmallFunctions from '../Functions/SmallFunctions.js'
import Notes from './Notes'
import Attack from './Attack'
import TakeDamage from './TakeDamage.js'
import Heal from './Heal.js'
import Destroy from './Destroy.js'

function Group(props) {

    const group = props.group
    let aliveCreatures = SmallFunctions.numAboveZero(group.creatures)

    const [selectedCreatures, changeSelectedCreatures] = useState([])

    const [menu, changeMenu] = useState(0) //Using this to tell the interaction forms to either show a button to open their form, their form, or nothing. 
    //Menu 0 is show buttons. 1 is Attack 2 is Defend 3 is Heal 4 is Destroy
    function updateMenu(selection) {
        changeMenu(selection)
    }

    function updateGroup(newGroup) {
        
        props.updateStats(newGroup)
    }
    

    return (
        <div>
        <span className="group">
            <div className="groupStats">
                {" " + group.name} 
                    <br />
                {aliveCreatures}/{group.initialSize} Creatures<br />
                <HealthCard group={group} /> AC: {group.armorClass} 
                <SaveBlock group={group}/> <br />
                <MemberDisplay group={group} selectedCreatures={selectedCreatures} changeSelectedCreatures={changeSelectedCreatures} /> 
                </div>
            
                <div className="menu">
                
                <Attack group={group} menu={menu} updateMenu={updateMenu} crit={props.crit} groupData={props.groupData} updateGroup={updateGroup} />
                <TakeDamage group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} />
                <Heal group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} />
                <Destroy group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} />   
                </div>
          
            
            
                
        </span>
            <Notes group={group} updateGroup={updateGroup} />
        </div>
    )
}

export default Group