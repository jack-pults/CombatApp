import React, { useState } from 'react'


function HealthCard(props) {

    const [viewMode, changeViewMode] = useState(false)
    const group = props.group

    return (
        <div>

           {viewMode ?
            "Total HP: " + group.creatures.reduce((total,num)=> total + num) + " / " + group.creatureHp * group.initialSize + " Originally"
            : 
            "Average HP: " + Math.round(group.creatures.reduce((average, num)=> average + num) / group.creatures.length) + " over " + group.creatures.length + " creatures"
           }

            <button type="button" onClick={() => changeViewMode(!viewMode)} > {viewMode ? "Average" : "Total"}  </button>
        </div>
    )
}




export default HealthCard



