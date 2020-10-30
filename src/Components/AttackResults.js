import React from 'react'

function AttackResults(props) {


    return (
        <div className="result">
            Total Damage= {props.finalResults.reduce( (sum, e) =>  e+ sum)} {props.type}
        </div>
    )

}

export default AttackResults