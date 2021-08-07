import React from 'react'

class Time extends React.Component {


    render() {
        return(
            <div className="menu-item" id={this.props.slot.time} >{this.props.slot.time}</div>
        )
    }

}

export default Time