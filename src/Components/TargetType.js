import React from 'react'



function TargetType(props) {
    let desig = Math.random() *1000
    return <div>
        Select Target Type: <br />
                <input type="radio" name={desig + "TargetType"} value="random" checked={props.targetType === "random"} onChange={(e) => props.change(e.target.value)} /> 
                {props.targetType==="random" ? <u>Random</u>: "Random" } <br />
                <input type="radio" name={desig + "TargetType"} value="lowest" checked={props.targetType === "lowest"} onChange={(e) => props.change(e.target.value)} /> 
                {props.targetType==="lowest" ? <u>Lowest HP</u>: "Lowest HP" } <br />
                <input type="radio" name={desig + "TargetType"} value="highest" checked={props.targetType === "highest"} onChange={(e) => props.change(e.target.value)} /> 
                {props.targetType==="highest" ? <u>Highest HP</u>: "Highest HP" }
        </div>

}

export default TargetType