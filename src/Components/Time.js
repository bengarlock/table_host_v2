import React from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { changeSlot } from "../Actions/Slot";

class Time extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.array.isRequired
    }

    onClickHandler = () => {
        let slot = [...this.props.currentSlot]
        slot[0].time = this.props.time
        this.props.changeSlot(slot)
        this.props.toggleMenu('time')
    }


    render() {
        return(
            <div className="menu-item" id={this.props.time} onClick={this.onClickHandler}>{this.props.time}</div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentSlot: state.slot.currentSlot
})

export default connect(mapStateToProps, { changeSlot })(Time);