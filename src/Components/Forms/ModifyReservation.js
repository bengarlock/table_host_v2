import React from 'react'
import "../../Stylesheets/ReservationForm.css"
import {connect} from "react-redux";
import { changeSlot } from "../../Actions/Slot";
import { changeGuest } from "../../Actions/Guest";
import { patchBook } from "../../Actions/Book";
import PropTypes from "prop-types";
import Time from "../MenuItem";
import MenuItem from "../MenuItem";

class ModifyReservation extends React.Component {

    state = {
        statusMenu: false,
        timeMenu: false,
        partySizeMenu: false,
    }

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        currentSlot: PropTypes.array.isRequired,
        currentGuest: PropTypes.array.isRequired,
        statuses: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.currentGuest[0].first_name,
            last_name: this.props.currentGuest[0].last_name,
            phone_number: this.props.currentGuest[0].phone_number,
            party_size: this.props.currentSlot[0].party_size,
            reservation_notes: this.props.currentSlot[0].reservation_notes,
            guest_notes: this.props.currentSlot[0].guest_notes,
            time: this.props.currentSlot[0].time,
            status: this.props.currentSlot[0].status === "" ? "Booked" : this.props.currentSlot[0].status
        })
    }

    onClickHandler = (e) => {
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
        } else if (e.target.id === 'party-size-menu') {
            this.setState({
                partySizeMenu: !this.state.partySizeMenu
            })
        } else if (e.target.id === 'menu-overlay') {
            this.setState({
                statusMenu: false,
                timeMenu: false,
                partySizeMenu: false,
            })
        }
    }

    onChangeHandler = (e) => {
        if (e.target.name === "first-name") {
            let guest = {...this.props.currentGuest[0]}
            guest.first_name = e.target.value
            this.props.changeGuest([guest])
        } else if (e.target.name === "last-name") {
            let guest = {...this.props.currentGuest[0]}
            guest.last_name = e.target.value
            this.props.changeGuest([guest])
        } else if (e.target.name === "phone-number") {
            let guest = {...this.props.currentGuest[0]}
            guest.phone_number = e.target.value
            this.props.changeGuest([guest])
        } else if (e.target.name === "guest-notes") {
            let guest = {...this.props.currentGuest[0]}
            guest.guest_notes = e.target.value
            this.props.changeGuest([guest])
        } else if (e.target.name === "reservation-notes") {
            let slot = {...this.props.currentSlot[0]}
            slot.reservation_notes = e.target.value
            this.props.changeSlot([slot])
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        let newBook = {...this.props.currentBook[0]}
        let slotToUpdate = newBook.slots.find(slot => slot.id === this.props.currentSlot[0].id)
        slotToUpdate.time = this.props.currentSlot[0].time
        slotToUpdate.party_size = this.props.currentSlot[0].party_size
        slotToUpdate.status = this.props.currentSlot[0].status
        slotToUpdate.reservation_notes = this.props.currentSlot[0].reservation_notes
        slotToUpdate.booked = this.props.currentSlot[0].booked
        slotToUpdate.guest = this.props.currentGuest[0]
        this.props.patchBook([newBook])
        this.props.changeSlot([])
        this.props.changeGuest([])
    }

    toggleMenu = (menu) => {
        if (menu === 'time') {
            this.setState({
                timeMenu: !this.state.timeMenu
            })
        } else if (menu === 'status') {
            this.setState({
                statusMenu: !this.state.statusMenu
            })
        } else if (menu === 'partySize') {
            this.setState({
                partySizeMenu: !this.state.partySizeMenu
            })
        }
    }

    renderTimes = () => {
        function uniq(a) {
            return Array.from(new Set(a));
        }
        let times = uniq(this.props.currentBook[0].slots.map(slot => slot.time)).sort()
        return times.map(time => <MenuItem key={times.indexOf(time)} menuItem={time} toggleMenu={this.toggleMenu} type={"time"}/>)
    }

    renderStatuses = () => {
        let statuses = this.props.statuses.map(status => status.label)
        return statuses.map(status => <MenuItem key={statuses.indexOf(status)} menuItem={status} toggleMenu={this.toggleMenu}  type={"status"}/>)
    }

    renderPartySizes = () => {
        let partySizes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        return partySizes.map(partySize => <MenuItem key={partySizes.indexOf(partySize)} menuItem={partySize} toggleMenu={this.toggleMenu}  type={"partySize"}/>)
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
                                {this.props.currentSlot[0].time}
                            </div>
                                {this.state.timeMenu ? (
                                    <>
                                        <div className="menu-overlay" id='menu-overlay' onClick={this.onClickHandler} />
                                        <div className="menu-items-wrapper">
                                            <div className="menu">
                                                {this.renderTimes()}
                                            </div>
                                        </div>
                                    </>
                                    )
                                    : null
                                }
                        </div>
                        <div>
                            <div className="menu-dropdown-wrapper" id="party-size-menu" onClick={this.onClickHandler}>
                                {this.props.currentSlot[0].party_size}
                            </div>
                            {this.state.partySizeMenu ? (
                                    <>
                                        <div className="menu-overlay" id='menu-overlay' onClick={this.onClickHandler} />
                                        <div className="menu-items-wrapper">
                                            <div className="menu">
                                                {this.renderPartySizes()}
                                            </div>
                                        </div>
                                    </>
                                )
                                : null
                            }
                        </div>
                        <div>
                            <div className="menu-dropdown-wrapper" id="status-menu" onClick={this.onClickHandler}>
                                {this.props.currentSlot[0].status}
                            </div>
                            <div className="menu-items-wrapper">
                                {this.state.statusMenu ? (
                                        <>
                                            <div className="menu-overlay" id='menu-overlay' onClick={this.onClickHandler} />
                                            <div className="menu-items-wrapper">
                                                {this.renderStatuses()}
                                            </div>
                                        </>
                                    )
                                    : null
                                }
                            </div>
                        </div>
                        <input name="first-name"
                               value={this.props.currentGuest[0].first_name}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="First Name"/>
                        <input name="last-name"
                               value={this.props.currentGuest[0].last_name}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Last Name" />
                        <input name="phone-number"
                               value={this.props.currentGuest[0].phone_number}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Phone Number" />
                        <input name="reservation-notes"
                               value={this.props.currentSlot[0].reservation_notes}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Reservation Notes" />
                        <input name="guest-notes"
                               value={this.props.currentGuest[0].guest_notes}
                               onChange={this.onChangeHandler}
                               type="text"
                               placeholder="Guest Notes" />


                        <input type="submit" />
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    currentGuest: state.guest.currentGuest,
    statuses: state.status.statuses
})


export default connect(mapStateToProps, { changeSlot, changeGuest, patchBook })(ModifyReservation);