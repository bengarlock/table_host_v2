import React from 'react'
import "../Stylesheets/Floor.css"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "./Slot";
import ReservationForm from "./ReservationForm";

class Floor extends React.Component {

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        currentSlot: PropTypes.array.isRequired
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

    render() {
        return(
            <div className="floor-wrapper">
                <div className="floor-reservations-wrapper">
                    <div className="floor-reservations-header">Reservations</div>
                    <div>
                        {this.renderReservations()}

                            {this.props.currentSlot[0] ?
                                <div className="reservation-floor-wrapper"> <ReservationForm /> </div> : null}

                    </div>
                </div>
                <div className="slider" onMouseOver={this.resizeHandler}>
                </div>
                <div className="floor-tables-wrapper">
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot
})

export default connect(mapStateToProps)(Floor)
