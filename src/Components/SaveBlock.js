import React from 'react'

function SaveBlock(props) {

    const Saves = props.group.Saves

    function addPlus(number) {
        if (number > 0 )
            return "+"+number
        else 
            return number
    }

    return (
        <div>
            STR: {addPlus(Saves.STR)} DEX: {addPlus(Saves.DEX)}<br/>
            CON: {addPlus(Saves.CON)} INT: {addPlus(Saves.INT)}<br/>
            WIS: {addPlus(Saves.WIS)} CHA: {addPlus(Saves.CHA)}
        </div>
    )
}

export default SaveBlock