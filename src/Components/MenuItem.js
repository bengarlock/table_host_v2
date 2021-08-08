import React from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { changeSlot } from "../Actions/Slot";

class MenuItem extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.array.isRequired
    }

    onClickHandler = () => {

        if (this.props.type === 'time') {
            let slot = [...this.props.currentSlot]
            slot[0].time = this.props.menuItem
            this.props.changeSlot(slot)
            this.props.toggleMenu('time')
        } else if (this.props.type === "status") {
            let slot = [...this.props.currentSlot]
            slot[0].status = this.props.menuItem
            this.props.changeSlot(slot)
            this.props.toggleMenu('status')
        }

    }


    render() {
        return(
            <div className="menu-item" id={this.props.menuItem} onClick={this.onClickHandler}>{this.props.menuItem}</div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentSlot: state.slot.currentSlot
})

export default connect(mapStateToProps, { changeSlot })(MenuItem);