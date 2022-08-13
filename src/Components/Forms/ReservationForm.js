import React from 'react'
import "../../Stylesheets/App.css"
import ModifyReservation from "./ModifyReservation";
import NewReservation from "./NewReservation";
import { connect } from "react-redux";
import { changeSlot } from "../../Actions/Slot";
import PropTypes from "prop-types";


class ReservationForm extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.object.isRequired,
        currentGuest: PropTypes.object.isRequired
    }

    render() {
        return(
            <div>
                {this.props.currentSlot.id && this.props.currentGuest.id ? <ModifyReservation /> : <NewReservation /> }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentSlot: state.slot.currentSlot,
    currentGuest: state.guest.currentGuest
})

export default connect(mapStateToProps, { changeSlot })(ReservationForm);