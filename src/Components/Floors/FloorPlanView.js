import React from 'react'
import "../../Stylesheets/App.css"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "../Books/Slot";
import ReservationForm from "../Forms/ReservationForm";
import Floor from "./Floor";
import StatusForm from "../Forms/StatusForm";

class FloorPlanView extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentSlot: PropTypes.object.isRequired,
        renderStatusForm: PropTypes.bool.isRequired,
    }

    state = {
        container_width: 350
    }

    renderReservations = () => {
        if (this.props.currentBook.slots) {
            let reservations = this.props.currentBook.slots.filter(reservation => reservation.status)
            reservations = reservations.filter(reservation => reservation.status.status_type === 'reservation')
            return reservations.map(slot => <Slot key={slot.id} slot={slot}/>)
        }
    }

    resizeHandler = (e) => {
        console.log(e.target)
    }

    renderFloors = () => {
        if (this.props.currentBook.floors) {
            return this.props.currentBook.floors.map(floor => <Floor key={floor.id} floor={floor}/>)
        }
    }

    onMouseDownHandler = (e) => {

        if (e.target.className === 'divider') {
            window.addEventListener("mousemove", this.onMouseMoveHandler)
            window.addEventListener("mouseup", this.onMouseUpHandler)
            this.onMouseMoveHandler(e)
        }
    }

    onMouseMoveHandler = (e) => {

        this.setState({
            container_width: this.state.container_width + e.movementX,
        })
    }

    onMouseUpHandler = () => {
        window.removeEventListener("mousemove", this.onMouseMoveHandler)
        window.removeEventListener("mouseup", this.onMouseUpHandler)
    }

    render() {
        return(
            <div className="floor-wrapper">
                <div className="floor-reservations-wrapper">
                    <div className="floor-reservations-container" style={{width: this.state.container_width + "px"}}>
                        {this.renderReservations()}
                    </div>
                    <div className="divider" onMouseDown={this.onMouseDownHandler}></div>
                </div>
                {this.renderFloors()}
                {this.props.currentSlot.id ? <div className="reservation-floor-wrapper"> <ReservationForm /> </div> : null}
                {this.props.renderStatusForm ? <StatusForm /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    hoverSlot: state.slot.hoverSlot,
    renderStatusForm: state.status.renderStatusForm
})

export default connect(mapStateToProps)(FloorPlanView)
