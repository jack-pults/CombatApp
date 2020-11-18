import React, { useState } from 'react'


function HealthCard(props) {

    const [viewMode, changeViewMode] = useState(false)
    const group = props.group

    const average = Math.round(group.creatures.reduce((average, num)=> average + num) / group.creatures.length)

    return (
        <button type="button" className="healthButton" onClick={() => changeViewMode(!viewMode)}  
        style={ average < group.creatureHp / 2 ?  {background:"#ec4e20" } : {background: "#548c2f"}} >

           {viewMode ?
            "Total HP: " + group.creatures.reduce((total,num)=> total + num) + "/" + group.creatureHp * group.initialSize 
            : 
            "Average HP: " + average
           }

        </button>
    )
}




export default HealthCard



