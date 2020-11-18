import React from 'react'


function CreatureGraphic(props) {

    var i = props.i
    var e = props.e

    function colorSwitch() {
        if(e / props.maxHp >= .75) {
            return "#548c2f"
        }
        else if (e / props.maxHp >= .3) return "#ffff00"
        else if (e > 0 ) return "#ff220c"
        return "grey"
    }

    return (
        
            <div onClick={() => props.clickCreature(i)}  className="Selectable, PopIn" key={i} >
                    <svg width="28" height="28" key={i}> 
                        <circle stroke={props.selectedCreatures.includes(i) ? "black" : "black"}  strokeWidth={props.selectedCreatures.includes(i) ? "2" : "0"} fill={colorSwitch()} cx="14" cy="14" r="13" key={i}></circle>
                        <text className="svgtext, PopIn" fill="black" fontSize="16" x={ e/10 >= 1 ? "5": "10"} y="18" >{e}</text>
                        
                    </svg>
            </div>
        
    )
}

export default CreatureGraphic