import React from 'react'
import "../Stylesheets/Floor.css"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "./Slot";

class Floor extends React.Component {

    static propTypes = {
        currentBook: PropTypes.array.isRequired
    }

    renderReservations = () => {
        if (this.props.currentBook[0]) {
            const reservations = this.props.currentBook[0].slots.filter(reservation => reservation.booked)
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
    currentBook: state.book.currentBook
})

export default connect(mapStateToProps)(Floor)
