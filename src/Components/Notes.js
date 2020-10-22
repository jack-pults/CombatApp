import React from 'react'


function Notes(props) {

    function updateSelf(event) {
        let newGroup = {...props.group}
        newGroup.notes = event.target.value
        props.updateGroup(newGroup)
    }

    return <textarea value={props.group.notes} onChange={updateSelf} ></textarea>
}

export default Notes