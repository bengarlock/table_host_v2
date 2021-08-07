import React from 'react'
import "../../Stylesheets/ReservationForm.css"
import {connect} from "react-redux";
import { changeSlot } from "../../Actions/Slot";
import { changeGuest } from "../../Actions/Guest";
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
        guest_notes: '',
        tables: '',
        statusMenu: false,
        timeMenu: false,

    }

    static propTypes = {
        currentSlot: PropTypes.array.isRequired,
        currentGuest: PropTypes.array.isRequired,
    }

    componentDidMount() {

        console.log(this.props.currentSlot[0].status ? this.props.currentSlot[0].status : "Booked")

        this.setState({
            first_name: this.props.currentGuest[0].first_name,
            last_name: this.props.currentGuest[0].last_name,
            phone_number: this.props.currentGuest[0].phone_number,
            reservation_notes: this.props.currentSlot[0].reservation_notes,
            guest_notes: this.props.currentSlot[0].guest_notes,
            time: this.props.currentSlot[0].time,
            status: this.props.currentSlot[0].status ? this.props.currentSlot[0].status : "Booked"
        })
    }

    onClickHandler = (e) => {
        console.log(e.target.id)
        if (e.target.id === "overlay") {
            this.props.changeSlot([])
            this.props.changeGuest([])
        } else if (e.target.id === "status-menu") {
            this.setState({
                statusMenu: !this.state.statusMenu
            })
        } else if (e.target.id === "time-menu") {
            this.setState({
                timeMenu: !this.state.timeMenu
            })
        } else if (e.target.id === 'menu-overlay') {
            this.setState({
                statusMenu: false,
                timeMenu: false,
            })
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

    onSubmitHandler = (e) => {
        e.preventDefault()

        let guest = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            guest_notes: this.state.guest_notes
        }

        let reservation = {

        }

    }


    render() {
        return(
            <>
                <div className="overlay" id="overlay" onClick={this.onClickHandler} />
                <div className="form-wrapper">
                    <h3>Reservation Details</h3>

                    <form className="user-form" onSubmit={this.onSubmitHandler}>
                        <div>
                            <div className="menu-dropdown-wrapper" id="time-menu" onClick={this.onClickHandler}>
                                Time
                            </div>

                                {this.state.timeMenu ? (
                                    <>
                                        <div className="menu-overlay" id='menu-overlay' onClick={this.onClickHandler} />
                                        <div className="menu-items-wrapper">
                                            <div className="menu">
                                                <div className="menu-item" id="booked">Booked</div>
                                                <div className="menu-item" id="confirmed">Confirmed</div>
                                                <div className="menu-item" id="cancel">Cancel</div>
                                                <div className="menu-item" id="noshow">No-show</div>
                                            </div>
                                        </div>
                                    </>
                                    )
                                    : null
                                }

                        </div>





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
                        <input name="reservation-notes"
                               value={this.state.reservation_notes}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Reservation Notes" />
                        <input name="guest-notes"
                               value={this.state.guest_notes}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Guest Notes" />

                        <div>
                            <div className="menu-dropdown-wrapper" id="status-menu" onClick={this.onClickHandler}>
                                {this.state.status}
                            </div>
                            <div className="menu-items-wrapper">
                                {this.state.statusMenu ? (
                                    <>
                                        <div className="menu-overlay" id='menu-overlay' onClick={this.onClickHandler} />
                                        <div className="menu-items-wrapper">
                                            <div className="menu">
                                                <div className="menu-item" id="booked">Booked</div>
                                                <div className="menu-item" id="confirmed">Confirmed</div>
                                                <div className="menu-item" id="cancel">Cancel</div>
                                                <div className="menu-item" id="noshow">No-show</div>
                                            </div>
                                        </div>
                                    </>

                                    )

                                    : null
                                }
                            </div>
                        </div>

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