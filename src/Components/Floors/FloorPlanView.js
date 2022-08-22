import React from 'react'
import "../../Stylesheets/App.css"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "../Books/Slot";
import ReservationForm from "../Forms/ReservationForm";
import Floor from "./Floor";
import StatusForm from "../Forms/StatusForm";
import { getSettings } from "../../Actions/Settings"

class FloorPlanView extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentSlot: PropTypes.object.isRequired,
        renderStatusForm: PropTypes.bool.isRequired,
        settings: PropTypes.object.isRequired
    }

    state = {
        container_width: 300
    }


    renderReservations = () => {
        if (this.props.currentBook.slots) {
            let reservations = this.props.currentBook.slots.filter(reservation => reservation.status)
            reservations = reservations.filter(reservation => reservation.status.status_type === 'reservation')
            return reservations.map(slot => <Slot key={slot.id} slot={slot} slotType='floor-slot'/> )
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
        const newPosition = this.state.container_width + e.movementX
        this.setState({
            container_width: newPosition
        })
    }

    onMouseUpHandler = () => {
        window.removeEventListener("mousemove", this.onMouseMoveHandler)
        window.removeEventListener("mouseup", this.onMouseUpHandler)
    }

    render() {
        return(
            <div className="floor-wrapper">
                <div className="floor-reservations-wrapper" style={{width: this.state.container_width}}>
                    {this.renderReservations()}
                </div>
                <div className="divider" onMouseDown={this.onMouseDownHandler}/>

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
    renderStatusForm: state.status.renderStatusForm,
    settings: state.settings.settings
})

export default connect(mapStateToProps, { getSettings })(FloorPlanView)
