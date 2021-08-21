import React from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { changeSlot } from "../Actions/Slot";

class MenuItem extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.array.isRequired,
        statuses: PropTypes.array.isRequired
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
        } else if (this.props.type === "partySize") {
            let slot = [...this.props.currentSlot]
            slot[0].party_size = this.props.menuItem
            this.props.changeSlot(slot)
            this.props.toggleMenu('partySize')
        }
    }

    renderStyle = (e) => {
        if (this.props.statuses.map(status => status.label).includes(this.props.menuItem)) {
            const status = this.props.statuses.filter(status => status.label === this.props.menuItem)
            return {backgroundColor: status[0].color}
        }
    }



    render() {
        return(
            <div className="menu-item"
                 id={this.props.menuItem}
                 onClick={this.onClickHandler}
                 style={this.renderStyle()}
            >
                {this.props.menuItem}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentSlot: state.slot.currentSlot,
    statuses: state.status.statuses,
})

export default connect(mapStateToProps, { changeSlot })(MenuItem);