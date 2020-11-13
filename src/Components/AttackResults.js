import React from 'react'



class AttackResults extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    

    render() {
        
        return (
            <div >
                <span>Total Damage= {this.props.finalDamage} {this.props.type} </span> 
            </div>
        )
    }

}

export default AttackResults