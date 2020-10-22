import React, { useState } from 'react';
import './App.css';
import Group from './Components/Group.js'
import NewGroupMaker from './Components/NewGroupMaker.js'
import Group_obj from './Classes/Group_obj.js'
import Attack_obj from './Classes/Attack_obj.js'


function App() {

  const [crit, changeCrit] = useState(false) //Whether we use critical hits 
  const [groupData, updateData] = useState(createInitial())

  function createInitial() {

    let list = []
    list.push(new Group_obj(0))
    list[0].name=  "Goblins"
    list[0].creatures= [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]
    list[0].initialSize=  18
    list[0].creatureHp=  7 
    list[0].armorClass=  15 
    list[0].attackOptions = []
    list[0].attackOptions.push(new Attack_obj("Scimitar", false, 4, 6, 1, 2, "Slashing"))
    list[0].attackOptions.push(new Attack_obj("Shortbow", false, 4, 6, 1, 2, "Piercing"))
    list[0].attackOptions.push(new Attack_obj("Sacred Flame", true, 4, 6, 1, 2, "Radiant"))
    list[0].Saves.STR = -1
    list[0].Saves.DEX = 2
    list[0].Saves.CON = 0
    list[0].Saves.INT = 0
    list[0].Saves.WIS = -1
    list[0].Saves.CHA = -1
    list[0].notes = "Nimble Escape. The goblin can take the Disengage or Hide action as a bonus action on each of its turns."

    list.push(new Group_obj(1))
    list[1].name=  "Sharks"
    list[1].creatures= [9,9,9,9,9,9,9]
    list[1].initialSize=  7
    list[1].creatureHp=  9 
    list[1].armorClass=  15 
    list[1].attackOptions = []
    list[1].attackOptions.push(new Attack_obj("Scimitar", false, 4, 6, 1, 2, "Slashing"))
    list[1].attackOptions.push(new Attack_obj("Shortbow", false, 4, 6, 1, 2, "Piercing"))
    list[1].Saves.STR = -1
    list[1].Saves.DEX = 2
    list[1].Saves.CON = 0
    list[1].Saves.INT = 0
    list[1].Saves.WIS = -1
    list[1].Saves.CHA = -1
    list[1].notes = "Nimble Escape. The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
    
    return list
  }

  
  function updateStats(updatedGroup) {
    ///recieves a group object
    const updatedArray = [...groupData] ///make duplicate of array of groups
    updatedArray[updatedGroup.key] = updatedGroup ///replace the old group in duplicate with new group
    updateData(updatedArray) ///update State with new revised array
    
  }

  const groups = groupData.map((element) => <Group key={element.key} group={element} updateStats={updateStats} crit={crit} groupData={groupData} />)

  return (
    <div className="App" >
      
      Use Critical Hits?
      <input type="checkbox" name="crit" checked={crit} onChange={()=> changeCrit(!crit)}/>
      {groups}
      <br />
      <br />
      <NewGroupMaker groupData={groupData} updateData={updateData} />


    </div>
  );
}

export default App;
