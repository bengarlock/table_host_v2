import React from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { changeSlot } from "../Actions/Slot";

class MenuItem extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.object.isRequired,
        statuses: PropTypes.array.isRequired,
    }

    state = {
        hover: false
    }

    onClickHandler = () => {
        if (this.props.type === 'time') {
            let slot = [...this.props.currentSlot]
            slot[0].time = this.props.menuItem
            this.props.changeSlot(slot)
            this.props.toggleMenu('time')
        } else if (this.props.type === "status") {
            let slot = this.props.currentSlot
            slot.status = this.props.menuItem
            this.props.changeSlot(slot)
            this.props.toggleMenu('status')
        } else if (this.props.type === "partySize") {
            let slot = [...this.props.currentSlot]
            slot.party_size = this.props.menuItem
            this.props.changeSlot(slot)
            this.props.toggleMenu('partySize')
        }
    }

    renderStyle = () => {
        if (!this.state.hover) {
            return {backgroundColor: this.props.menuItem.color, transition: '.5s'}
        } else {
            return {backgroundColor: "#103974", transition: '.5s'}
        }
    }

    toggleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }

    render() {
        return(
            <div className="menu-item"
                 onMouseEnter={this.toggleHover}
                 onMouseLeave={this.toggleHover}
                 id={this.props.menuItem.name}
                 onClick={this.onClickHandler}
                 style={this.renderStyle()}
            >
                {this.props.menuItem.name ? this.props.menuItem.name : this.props.menuItem}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    currentSlot: state.slot.currentSlot,
    statuses: state.status.statuses,
})

export default connect(mapStateToProps, { changeSlot })(MenuItem);