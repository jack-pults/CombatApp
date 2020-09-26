import React from 'react'


function CreatureGraphic(props) {

    var i = props.i
    var e = props.e

    return (
        
            <span onClick={() => props.clickCreature(i)}  className="Selectable, PopIn" key={i}>
                    <svg width="22" height="22" key={i}> 
                        <circle stroke={props.selectedCreatures.includes(i) ? "red" : "black"}  strokeWidth="2" fill="green" cx="11" cy="11" r="10" key={i}></circle>
                        <text className="svgtext, PopIn" fill="black" fontSize="16" x="7" y="16" >{e}</text>
                    </svg>
            </span>
        
    )
}

export default CreatureGraphic