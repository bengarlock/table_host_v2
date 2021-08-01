import React from 'react'
import "../Stylesheets/Slot.css"

class Slot extends React.Component {


    render() {
        return(
            <div className="slot-container">
                <span>{this.props.slot.time}</span>
                <span>{this.props.slot.party_size}</span>
                {this.props.slot.booked}
            </div>
        )
    }
}

export default Slot