import React from 'react'
import "../Stylesheets/Slot.css"
import PropTypes from 'prop-types';
import { changeSlot } from "../Actions/Slot";
import { changeGuest} from "../Actions/Guest";
import { connect } from "react-redux";



class Slot extends React.Component {

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        statuses: PropTypes.array.isRequired
    }

    clickHandler = () => {
        if (this.props.slot.booked) {

            this.props.changeSlot([this.props.slot])
            this.props.changeGuest([this.props.slot.guest])

        } else {
            let newSlot = {...this.props.slot}
            newSlot.status = "Booked"
            newSlot.booked = true
            this.props.changeSlot([newSlot])
        }
    }

    renderStyle = () => {
        if (this.props.slot.status) {
            return { backgroundColor: this.props.slot.status.color }
        }
    }

    render() {
        return(
            <div className="slot-container" onDoubleClick={this.clickHandler} style={this.renderStyle()}>
                <span>{this.props.slot.time}</span>
                <span>{this.props.slot.party_size}</span>
                {
                    this.props.slot.guest ?
                        <>
                            <span>
                                {this.props.slot.guest.first_name + "  "}
                                {this.props.slot.guest.last_name}
                            </span>
                            <span>{this.props.slot.guest.phone_number}</span>
                            <span>{this.props.slot.reservation_notes}</span>
                        </>
                        :
                        null
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    statuses: state.status.statuses,
})

export default connect(mapStateToProps, { changeSlot, changeGuest })(Slot);