import React, {useState} from 'react'
import CreatureData from "../CreatureData.js"
import TextInput from "./TextInput"
import NumberInput from "./NumberInput"
import Group_obj from '../Classes/Group_obj.js'
import Attack_obj from '../Classes/Attack_obj.js'
import Notes from './Notes'

function NewGroupMaker(props){

    const [newCreature, changeNewCreature] = useState(new Group_obj(1))

    const [attackType, changeAttackType] = useState(false)
    
    function creatureUpdate(newStuff, part) {
        
        const updatedCreature = {...newCreature}
        
        updatedCreature[part] = newStuff
        changeNewCreature(updatedCreature)

    }

    function updateSave(name, value) {
        let newSaves = {...newCreature.Saves}
        newSaves[name] = value
        creatureUpdate(newSaves, "Saves")
    } 


    function creaturePresets() {
        return CreatureData.map((element, index) => <option key={index} value={element.key}> {element.name} </option> )
    }

    function submitAttack(event) {
        let tar = event.target
        let newAttack = new Attack_obj(tar[0].value, tar[1].value, Number(tar[4].value), tar[5].value, tar[6].value, tar[7].value, tar[8].value, tar[3].value, tar[2].value )

        let newAttacks = [...newCreature.attackOptions]
        newAttacks.push(newAttack)
        creatureUpdate(newAttacks, "attackOptions")
        event.preventDefault();
    }

    function submitCreature() {
        
        let group = {...newCreature}
        group.key = props.groupData.length-1
        let newData = JSON.parse(JSON.stringify(props.groupData))
        newData.push(group)
        props.updateData(newData)
        changeNewCreature(new Group_obj(1))
    }

    function modifyObjectState(object, newData) {
        //Function will return an updated copy of an object to be plugged into its update state function.
        let updated = JSON.parse(JSON.stringify(object))

        if (arguments.length < 3){
            throw(new Error("Need at least 1 path argument."))
        }
        
        let finder = updated
        for (let i=2; i < arguments.length -1; i++)
        {
            finder = finder[arguments[i]] 
        }
        finder[arguments[arguments.length-1]] = newData
        return updated
    }

    

    return(
        <div>
            New Group Editor <br />
            Select Preset: <select name="presets" id="presets"> 
                            {creaturePresets()}
                            </select> <br />
            Name:<TextInput data={newCreature.name} change={(newData) => changeNewCreature(modifyObjectState(newCreature, newData, "name"))}  />
            How Many?:<NumberInput data={newCreature.initialSize} change={creatureUpdate} part="initialSize" />
            HP:<NumberInput data={newCreature.creatureHp} change={creatureUpdate} part="creatureHp" />
            AC:<NumberInput data={newCreature.armorClass} change={creatureUpdate} part="armorClass" />
            
            <form>
                <label>
                    STR
                    <input type="number" name="STR" value={newCreature.Saves.STR} onChange={(e)=> changeNewCreature(modifyObjectState(newCreature, e.target.value, "Saves", "STR"))}></input>
                </label>
                <label>
                    DEX
                    <input type="number" name="DEX" value={newCreature.Saves.DEX} onChange={(e)=> updateSave(e.target.name, e.target.value)}></input>
                </label>
                <br/>
                <label>
                    CON
                    <input type="number" name="CON" value={newCreature.Saves.CON} onChange={(e)=> updateSave(e.target.name, e.target.value)}></input>
                </label>
                <label>
                    WIS
                    <input type="number" name="WIS" value={newCreature.Saves.WIS} onChange={(e)=> updateSave(e.target.name, e.target.value)}></input>
                </label>
                <br/>
                <label>
                    INT
                    <input type="number" name="INT" value={newCreature.Saves.INT} onChange={(e)=> updateSave(e.target.name, e.target.value)}></input>
                </label>
                <label>
                    CHA
                    <input type="number" name="CHA" value={newCreature.Saves.CHA} onChange={(e)=> updateSave(e.target.name, e.target.value)}></input>
                </label>
            </form>

            <form onSubmit={submitAttack}>
                Name<input required={true} type="text" name="name"></input> 
                Saving Throw Attack?<input type="checkbox" name="saving" value={attackType} onChange={()=>changeAttackType(!attackType)}></input>
                        <div hidden={!attackType}> DC:<input required={attackType} type="number" name="DC"></input> 
                            Type of Save:<select name="savingType">
                                <option value="STR">STR</option>
                                <option value="DEX">DEX</option>
                                <option value="CON">CON</option>
                                <option value="WIS">WIS</option>
                                <option value="INT">INT</option>
                                <option value="CHA">CHA</option>
                            </select>
                
                            </div> 
                            

                <div hidden={attackType}>Attack Bonus</div><input hidden={attackType} type="number" name="bonus"></input> 
                Damage Die<input required={true} type="number" min="1" name="damDie" defaultValue={4}></input> 
                Number of Die<input required={true} type="number" name="numDie" min="0" defaultValue={1} ></input>
                Damage Bonus<input type="number" name="damBonus" min="0"></input>
                Damage Type<select>
                    <option value="Piercing">Piercing</option>
                    <option value="Slashing">Slashing</option>
                    <option value="Bludgeoning">Bludgeoning</option>
                    <option value="Cold">Cold</option>
                    <option value="Fire">Fire</option>
                    <option value="Lightning">Lightning</option>
                    <option value="Force">Force</option>
                    <option value="Thunder">Thunder</option>
                    <option value="Radiant">Radiant</option>
                    <option value="Necrotic">Necrotic</option>
                    <option value="Acid">Acid</option>
                    <option value="Poison">Poison</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Special">Special</option>
                    <option value="True">True</option>
                </select>
                <button type="submit">Add Attack</button>
            </form>

            {newCreature.attackOptions.map( (value,index) => <div key={index}>{value.name} {value.bonus} </div>)}
            
            <Notes group={newCreature} updateGroup={changeNewCreature} />
            <button type="button" onClick={submitCreature}>Create</button>
        </div>
    )

}

export default NewGroupMaker