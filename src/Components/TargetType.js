import React from 'react'



function TargetType(props) {
    let desig = Math.random() *1000
    return <div>
        Select Target Type:
                <input type="radio" name={desig + "TargetType"} value="random" checked={props.targetType === "random"} onChange={(e) => props.change(e.target.value)} /> Random
                <input type="radio" name={desig + "TargetType"} value="lowest" checked={props.targetType === "lowest"} onChange={(e) => props.change(e.target.value)} /> Lowest HP
                <input type="radio" name={desig + "TargetType"} value="highest" checked={props.targetType === "highest"} onChange={(e) => props.change(e.target.value)} /> Highest HP
        </div>

}

export default TargetType