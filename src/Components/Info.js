import React, { useState } from 'react'



function Info() {

    const [menu, changeMenu] = useState(0)

    switch (menu) {
        case 0:
            return <div className="info">
                Create groups of creatures and quickly roll their attacks and saving throws. <br />
                Click Attack to roll attacks against a single target or another group in the list. <br />
                Click Defend to apply damage to a single member or roll saves for multiple targets. 
            </div>
        case 1:
        case 2:
        case 3:
        default:
            return <span></span>
    }

}

export default Info