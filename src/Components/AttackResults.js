import React from 'react'



function AttackResults(props) {

    

    return (
        <div className="result">
            Total Damage= {props.finalDamage} {props.type}
        </div>
    )

}

export default AttackResults