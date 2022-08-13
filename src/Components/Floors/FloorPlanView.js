import React from 'react'
import '../../Stylesheets/App.css'
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "../Books/Slot";
import ReservationForm from "../Forms/ReservationForm";
import Floor from "./Floor";

class FloorPlanView extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentSlot: PropTypes.object.isRequired,
    }

    state = {
        floors: [
            {
                id: 1,
                name: "main",
                tables: [
                    {
                        id: 1,
                        name: "1",
                        class_name: "table",
                        width: "50px",
                        height: "50px",
                        background_color: "#9b9b9b",
                        border: "2px solid gray",
                        top: "100px",
                        left: "500px",
                    }]
            }
        ]
    }

    renderReservations = () => {
        if (this.props.currentBook.slots) {
            const reservations = this.props.currentBook.slots.filter(reservation =>
                reservation.booked
            )
            return reservations.map(slot => <Slot key={slot.id} slot={slot}/>)
        }
    }

    resizeHandler = (e) => {
        console.log(e.target)
    }



    renderFloors = () => {
        return this.state.floors.map(floor => <Floor key={floor.id} floor={floor}/>)
    }


    render() {
        return(
            <div className="floor-wrapper">
                <div className="floor-reservations-wrapper">
                    <div className="floor-reservations-container">
                        {this.renderReservations()}
                    </div>
                </div>
                {this.renderFloors()}
                {this.props.currentSlot.id ? <div className="reservation-floor-wrapper"> <ReservationForm /> </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    hoverSlot: state.slot.hoverSlot
})

export default connect(mapStateToProps)(FloorPlanView)
