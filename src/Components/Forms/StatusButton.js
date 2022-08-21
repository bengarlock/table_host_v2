import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";


class StatusButton extends React.Component {
    static propTypes = {
        currentTable: PropTypes.object.isRequired
    }

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

const mapStateToProps = (state) => ({
    currentTable: state.table.currentTable
})

export default connect(mapStateToProps)(StatusButton)