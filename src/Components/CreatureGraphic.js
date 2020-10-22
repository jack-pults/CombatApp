import React from 'react'


function CreatureGraphic(props) {

    var i = props.i
    var e = props.e

    return (
        
            <div onClick={() => props.clickCreature(i)}  className="Selectable, PopIn" key={i} >
                    <svg width="30" height="32" key={i}> 
                        <circle stroke={props.selectedCreatures.includes(i) ? "red" : "black"}  strokeWidth="2" fill="green" cx="14" cy="14" r="13" key={i}></circle>
                        <text className="svgtext, PopIn" fill="black" fontSize="16" x={ e/10 >= 1 ? "5": "10"} y="18" >{e}</text>
                    </svg>
            </div>
        
    )
}

export default CreatureGraphic