import React from 'react'
import "../Stylesheets/ReservationForm.css"
import ModifyReservation from "./Forms/ModifyReservation";
import NewReservation from "./Forms/NewReservation";
import { connect } from "react-redux";
import { changeSlot } from "../Actions/Slot";
import PropTypes from "prop-types";


class ReservationForm extends React.Component {



    static propTypes = {
        currentSlot: PropTypes.array.isRequired
    }

    componentDidMount = () => {

    }

    onClickHandler = () => {

    }






    render() {
        return(
            <div>
                {this.props.currentSlot[0].booked ? <ModifyReservation /> : <NewReservation />}
                    <div>

                        <div className="form-wrapper">
                            <h3>Reservation</h3>
                            <form className="user-form">
                                <input name="first-name" type="text" placeholder="First Name"/>
                                <input name="last-name" type="text" placeholder="Last Name" />
                                <input name="phone-number" type="text" placeholder="Phone Number" />
                                <input type="submit" />
                            </form>
                        </div>
                    </div>

                :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentSlot: state.book.currentBook,
})

export default connect(mapStateToProps, { changeSlot })(ReservationForm);