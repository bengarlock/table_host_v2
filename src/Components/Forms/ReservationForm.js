import React from 'react'
import "../../Stylesheets/ReservationForm.css"
import ModifyReservation from "./ModifyReservation";
import NewReservation from "./NewReservation";
import { connect } from "react-redux";
import { changeSlot } from "../../Actions/Slot";
import PropTypes from "prop-types";


class ReservationForm extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.array.isRequired,
        currentGuest: PropTypes.array.isRequired
    }

    render() {
        return(
            <div>
                {this.props.currentSlot[0] && this.props.currentGuest[0] ? <ModifyReservation /> : <NewReservation />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentSlot: state.slot.currentSlot,
    currentGuest: state.guest.currentGuest
})

export default connect(mapStateToProps, { changeSlot })(ReservationForm);