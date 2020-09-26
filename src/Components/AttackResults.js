import React from 'react'

function AttackResults(props) {

    
    function makeResultGraphic(element,index) {
        
        if (element > 0) {
        return <span style={{color:"Green"}} key={index}>-Roll{props.rolls[index]}={element}-</span>
        }
        else return <span style={{color:"Red"}} key={index}>-Miss-</span>
    }

    return (
        <div>
        <div>
            {props.finalResults.map( (e,index) => makeResultGraphic(e,index) )}
        </div>
        <div>
            Total Damage= {props.finalResults.reduce( (sum, e) =>  e+ sum)} {props.type}
        </div>
        </div>
    )

}

export default AttackResults