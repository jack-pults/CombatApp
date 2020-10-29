import React from 'react'
import CreatureGraphic from './CreatureGraphic'


class MemberDisplay extends React.Component  {

    constructor(props) {
        super(props)

        this.clickCreature = this.clickCreature.bind(this)
        this.createCircles = this.createCircles.bind(this)
    }

    clickCreature(i) {
        
        let tempArr = this.props.selectedCreatures
        
        if (tempArr.includes(i)) {
            tempArr.splice( tempArr.indexOf(i), 1)
        }
        else {
            tempArr.push(i)
        }

        
        this.props.changeSelectedCreatures(tempArr)
        this.forceUpdate()
        
    }    


    createCircles() {

        return this.props.group.creatures.map((e,i) => 
            <CreatureGraphic e={e} i={i} selectedCreatures={this.props.selectedCreatures} clickCreature={this.clickCreature} key={i} maxHp={this.props.group.creatureHp} /> )

    }

    render() {
        
        return (
            <div className="memberCircles">
                {this.createCircles()}
            </div>
        )
    }
}

export default MemberDisplay