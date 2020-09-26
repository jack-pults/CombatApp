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
        <div> 
            {" " + group.name} AC: {group.armorClass} <br />
            It has {aliveCreatures} creatures alive out of {group.initialSize} <br />
            <HealthCard group={group} />
            <MemberDisplay group={group} selectedCreatures={selectedCreatures} changeSelectedCreatures={changeSelectedCreatures} />
            <SaveBlock group={group}/>
            <Attack group={group} menu={menu} updateMenu={updateMenu} crit={props.crit} groupData={props.groupData} updateGroup={updateGroup} />

            <TakeDamage group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} />
            <br />
            
            
            <Notes group={group} updateGroup={updateGroup} />
            
        </div>
    )
}

export default Group