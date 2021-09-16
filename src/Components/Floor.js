import React from 'react'
import "../Stylesheets/Floor.css"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "./Slot";
import ReservationForm from "./ReservationForm";

class Floor extends React.Component {

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        currentSlot: PropTypes.array.isRequired,
        hoverSlot: PropTypes.array.isRequired
    }

    renderReservations = () => {
        if (this.props.currentBook[0]) {
            const reservations = this.props.currentBook[0].slots.filter(reservation =>
                reservation.booked
            )
            return reservations.map(slot => <Slot key={slot.id} slot={slot}/>)
        }
    }

    resizeHandler = (e) => {
        console.log(e.target)
    }

    onDragEnter = (e) => {
        let table = e.target
        table.style.backgroundColor = "#162a4b"
    }

    onDragExit = (e) => {
        let table = e.target
        table.style.backgroundColor = null
    }


    render() {
        return(
            <div className="floor-wrapper">
                <div className="floor-reservations-wrapper">
                    <div className="floor-reservations-header">Reservations</div>
                    <div>
                        {this.renderReservations()}
                    </div>
                </div>
                <div className="slider" onMouseOver={this.resizeHandler}>
                </div>
                <div className="floor-tables-wrapper">
                    <div className="table"
                         onDragEnter={this.onDragEnter}
                         onDragLeave={this.onDragExit}
                    >1</div>
                </div>
                {this.props.currentSlot[0] ? <div className="reservation-floor-wrapper"> <ReservationForm /> </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    hoverSlot: state.slot.hoverSlot
})

export default connect(mapStateToProps)(Floor)
