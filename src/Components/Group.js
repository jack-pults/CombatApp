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
import Results from './Results.js'

function Group(props) {

    const group = props.group
    let aliveCreatures = SmallFunctions.numAboveZero(group.creatures)

    const [selectedCreatures, changeSelectedCreatures] = useState([])
    const [results, changeResults] = useState([])

    const [menu, changeMenu] = useState(0) //Using this to tell the interaction forms to either show a button to open their form, their form, or nothing. 
    //Menu 0 is show buttons. 1 is Attack 2 is Defend 3 is Heal 4 is Destroy
    function updateMenu(selection) {
        changeMenu(selection)
    }

    function updateGroup(newGroup) {
        
        props.updateStats(newGroup)
    }
    
    if (menu === 0 && results.length > 0) changeResults([])

    return (
        <div className="groupContainer">
        <span className="group">
            <div className="groupStats">
                <span className="groupTitle">{group.name} {aliveCreatures}/{group.initialSize} </span>  <br />
                <HealthCard group={group} /> <br />
                AC: {group.armorClass} 
                <SaveBlock group={group}/> <br />
                <button onClick={() => changeSelectedCreatures(group.creatures.map( (value, index)=> index))}>Select All</button>
                <button onClick={() => changeSelectedCreatures([])}>Clear Selection</button>
                <MemberDisplay group={group} selectedCreatures={selectedCreatures} changeSelectedCreatures={changeSelectedCreatures} /> 
                </div>
            
                <div className="menu">
                
                <Attack group={group} menu={menu} updateMenu={updateMenu} crit={props.crit} groupData={props.groupData} updateGroup={updateGroup} changeResults={changeResults}/>
                <br />
                <TakeDamage group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} changeResults={changeResults} />
                <br />
                <Heal group={group} menu={menu} updateMenu={updateMenu} updateGroup={updateGroup} selectedCreatures={selectedCreatures} />
                <br />
                <Destroy group={group} menu={menu} groupData={props.groupData} updateStats={props.updateStats} updateMenu={updateMenu} updateGroup={updateGroup} 
                    selectedCreatures={selectedCreatures} changeSelectedCreatures={changeSelectedCreatures}
                            />   
                </div>
          
            
            
                
        </span>
            <div className="diceContainer">
                <Results results={results} />  
            </div>
            <Notes group={group} updateGroup={updateGroup} />
        </div>
    )
}

export default Group