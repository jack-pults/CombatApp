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
        <div className="saveBlock">
            
            <div>
            <b>STR:</b> {addPlus(Saves.STR)} 
                </div>
                <div>
                <b>DEX:</b> {addPlus(Saves.DEX)}
                </div>
                <div>
                <b>CON:</b> {addPlus(Saves.CON)} 
                </div>
                <div>
                <b>INT:</b> {addPlus(Saves.INT)}
                </div>
                <div>
                <b>WIS:</b> {addPlus(Saves.WIS)} 
                </div>
                <div>
                <b>CHA:</b> {addPlus(Saves.CHA)}
                </div>
        </div>
    )
}

export default SaveBlock