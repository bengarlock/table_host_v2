import React from 'react'
import "../../Stylesheets/App.css"
import {connect} from "react-redux";
import { changeSlot, patchSlot } from "../../Actions/Slot";
import { changeGuest, patchGuest } from "../../Actions/Guest";
import { patchBook } from "../../Actions/Book";
import PropTypes from "prop-types";
import MenuItem from "../MenuItem";

class ModifyReservation extends React.Component {

    state = {
        statusMenu: false,
        timeMenu: false,
        partySizeMenu: false,
    }

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentSlot: PropTypes.object.isRequired,
        currentGuest: PropTypes.object.isRequired,
        statuses: PropTypes.array.isRequired,
    }

    componentDidMount() {

        this.setState({
            first_name: this.props.currentGuest.first_name,
            last_name: this.props.currentGuest.last_name,
            phone_number: this.props.currentGuest.phone_number,
            party_size: this.props.currentSlot.party_size,
            reservation_notes: this.props.currentSlot.reservation_notes,
            guest_notes: this.props.currentSlot.guest_notes,
            time: this.props.currentSlot.time,
            status: this.props.currentSlot.status.name
        })
    }

    onClickHandler = (e) => {
        if (e.target.id === "overlay") {
            this.props.changeSlot({})
            this.props.changeGuest({})
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
            let guest = {...this.props.currentGuest}
            guest.first_name = e.target.value
            this.props.changeGuest(guest)
        } else if (e.target.name === "last-name") {
            let guest = {...this.props.currentGuest}
            guest.last_name = e.target.value
            this.props.changeGuest(guest)
        } else if (e.target.name === "phone-number") {
            let guest = {...this.props.currentGuest}
            guest.phone_number = e.target.value
            this.props.changeGuest(guest)
        } else if (e.target.name === "guest-notes") {
            let guest = {...this.props.currentGuest}
            guest.guest_notes = e.target.value
            this.props.changeGuest(guest)
        } else if (e.target.name === "reservation-notes") {
            let slot = {...this.props.currentSlot}
            slot.reservation_notes = e.target.value
            this.props.changeSlot(slot)
        }
    }

    unSeatTable = () => {
        console.log("unseat table")
        let currenTables = [...this.props.currentBook.floors[0].tables]
        let tableToUnseat = currenTables.find(table => table.reservation === this.props.currentSlot.id)
        console.log(tableToUnseat)

    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        let newBook = {...this.props.currentBook}
        let slotToUpdate = newBook.slots.find(slot => slot.id === this.props.currentSlot.id)

        if (this.props.currentSlot.status.name === "Cancelled") {
            slotToUpdate.time = this.props.currentSlot.time
            slotToUpdate.party_size = this.props.currentSlot.party_size
            slotToUpdate.status = null
            slotToUpdate.reservation_notes = ""
            slotToUpdate.booked = false
            slotToUpdate.guest = null

            this.props.patchBook(newBook)
            this.props.patchSlot(this.props.currentSlot, null)
            this.props.patchGuest(this.props.currentGuest)
            this.props.changeSlot({})
            this.props.changeGuest({})

        } else {

            slotToUpdate.time = this.props.currentSlot.time
            slotToUpdate.party_size = this.props.currentSlot.party_size
            slotToUpdate.status = this.props.currentSlot.status
            slotToUpdate.reservation_notes = this.props.currentSlot.reservation_notes
            slotToUpdate.booked = this.props.currentSlot.booked
            slotToUpdate.guest = this.props.currentGuest

            this.props.patchBook(newBook)
            this.props.patchSlot(this.props.currentSlot, this.props.currentGuest.id)
            this.props.patchGuest(this.props.currentGuest)
            this.props.changeSlot({})
            this.props.changeGuest({})
        }
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
        let times = uniq(this.props.currentBook.slots.map(slot => slot.time)).sort()
        return times.map(time =>
            <MenuItem key={times.indexOf(time)} menuItem={time} toggleMenu={this.toggleMenu} type={"time"}/>)
    }

    renderStatuses = () => {
        let statuses = this.props.statuses.filter(status => status.status_type === 'reservation')
        return statuses.map(status =>
            <MenuItem key={status.id} menuItem={status} toggleMenu={this.toggleMenu} type={"status"}/>)
    }

    renderPartySizes = () => {
        let partySizes = []
        for (let i=1; i < 21; i++) {
            partySizes.push(i)
        }
        return partySizes.map(partySize =>
            <MenuItem
                key={partySizes.indexOf(partySize)}
                menuItem={partySize}
                toggleMenu={this.toggleMenu}
                type={"partySize"}/>)
    }

    render() {
        return(
            <>
                <div className="overlay" id="overlay" onClick={this.onClickHandler} />
                <div className="form-wrapper">

                    <form className="user-form" onSubmit={this.onSubmitHandler}>
                        <h3>Reservation Details</h3>

                        <div className="menu-collection-wrapper">
                            <div className="user-select-option">
                                <div className="label">Time</div>
                                <div className="menu-dropdown-wrapper"
                                     id="time-menu"
                                     onClick={this.onClickHandler}>
                                    {this.props.currentSlot.time}
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

                            <div className="user-select-option">
                                <div className="label">Party Size</div>
                            <div className="menu-dropdown-wrapper" id="party-size-menu" onClick={this.onClickHandler}>
                                {this.props.currentSlot.party_size}
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

                            <div className="user-select-option">
                                <div className="label">Status</div>
                                <div className="menu-dropdown-wrapper"
                                     id="status-menu"
                                     onClick={this.onClickHandler}
                                     style={{backgroundColor: this.props.currentSlot.status.color}}
                                >
                                    {this.props.currentSlot.status.name}
                                </div>
                                {this.state.statusMenu ? (
                                        <>
                                            <div className="menu-overlay" id='menu-overlay' onClick={this.onClickHandler} />
                                            <div className="menu-items-wrapper">
                                                <div className="menu">
                                                    {this.renderStatuses()}
                                                </div>
                                            </div>
                                        </>
                                    )
                                    : null
                                }
                            </div>
                        </div>

                        <div className="form-collection-wrapper">
                            <div className="input-wrapper">
                                <div className="label">First Name</div>
                                <input name="first-name"
                                       value={this.props.currentGuest.first_name}
                                       onChange={this.onChangeHandler}
                                       type="text"
                                       placeholder="First Name"/>
                            </div>
                            <div className="input-wrapper">
                                <div className="label">Last Name</div>
                                <input name="last-name"
                                       value={this.props.currentGuest.last_name}
                                       onChange={this.onChangeHandler}
                                       type="text"
                                       placeholder="Last Name" />
                            </div>
                            <div className="input-wrapper">
                                <div className="label">Phone</div>
                                <input name="phone-number"
                                       value={this.props.currentGuest.phone_number}
                                       onChange={this.onChangeHandler}
                                       type="text"
                                       placeholder="Phone Number" />
                            </div>

                        </div>
                        <div className="notes-wrapper">

                            <div className="note">
                                <label>Reservation Notes</label>
                                <input id='reservation-notes' name="reservation-notes"
                                       autoComplete="off"
                                       value={this.props.currentSlot.reservation_notes}
                                       onChange={this.onChangeHandler}
                                       type="text"
                                       placeholder="Reservation Notes" />


                            </div>
                            <div className="note">
                                <label>Guest Notes</label>
                                <input id='guest-notes' name="guest-notes"
                                       autoComplete="off"
                                       value={this.props.currentGuest.guest_notes}
                                       onChange={this.onChangeHandler}
                                       type="text"
                                       placeholder="Guest Notes" />
                            </div>



                        </div>
                        <div className='submit'>
                            <input type="submit" />
                        </div>

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

export default connect(mapStateToProps, { changeSlot, changeGuest, patchBook, patchSlot, patchGuest })(ModifyReservation);