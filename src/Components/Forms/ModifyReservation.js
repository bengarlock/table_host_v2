import React from 'react'
import "../../Stylesheets/ReservationForm.css"
import {connect} from "react-redux";
import { changeSlot } from "../../Actions/Slot";
import { changeGuest} from "../../Actions/Guest";
import PropTypes from "prop-types";

class ModifyReservation extends React.Component {

    state = {
        booked: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        time: '',
        party_size: '',
        status: '',
        reservation_notes: '',
        tables: '',
    }

    static propTypes = {
        currentSlot: PropTypes.array.isRequired,
        currentGuest: PropTypes.array.isRequired,
    }

    onClickHandler = (e) => {
        if (e.target.id === "overlay") {
            this.props.changeSlot([])
            this.props.changeGuest([])
        }
    }

    onChangeHandler = (e) => {
        if (e.target.name === "first-name") {
            this.setState({
                first_name: e.target.value
            })
        } else if (e.target.name === "last-name") {
            this.setState({
                last_name: e.target.value
            })
        } else if (e.target.name === "phone-number") {
            this.setState({
                phone_number: e.target.value
            })
        }
    }

    render() {
        return(
            <>
                <div className="overlay" id="overlay" onClick={this.onClickHandler} />
                <div className="form-wrapper">
                    <h3>Reservation</h3>

                    <form className="user-form">
                        <input name="first-name"
                               value={this.state.first_name}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="First Name"/>
                        <input name="last-name"
                               value={this.state.last_name}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Last Name" />
                        <input name="phone-number"
                               value={this.state.phone_number}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Phone Number" />
                        <input type="submit" />
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentSlot: state.book.currentBook,
    currentGuest: state.guest.currentGuest,
})


export default connect(mapStateToProps, { changeSlot, changeGuest })(ModifyReservation);