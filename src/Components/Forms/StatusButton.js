import React from 'react'


class StatusButton extends React.Component {

    render() {
        return(
            <div className="status-button" style={{
                backgroundColor: this.props.status.color
            }}>
                {this.props.status.name}
            </div>
        )
    }
}

export default StatusButton