import React from 'react'
import '../../Stylesheets/App.css'
import PropTypes from 'prop-types';
import { changeSlot, changeSeatedSlot, patchSlot } from "../../Actions/Slot";
import { patchTable } from "../../Actions/Table";
import { patchBook } from "../../Actions/Book"

import { changeGuest} from "../../Actions/Guest";
import { connect } from "react-redux";



class Slot extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        statuses: PropTypes.array.isRequired,
        seatedSlot: PropTypes.object.isRequired,
        currentTable: PropTypes.object.isRequired
    }

    state = {
        hover: false
    }

    clickHandler = () => {
        // check if slot is booked.  If it is, render Modify form. Otherwise render new reso form.
        if (this.props.slot.booked) {
            this.props.changeSlot(this.props.slot)
            this.props.changeGuest(this.props.slot.guest)

        } else {
            let newSlot = {...this.props.slot}
            newSlot.status = this.props.statuses.filter(status => status.name === "Booked")[0]
            newSlot.booked = true
            this.props.changeSlot(newSlot)
        }
    }

    renderStyle = () => {
        if (this.props.slot.status) {
            if (!this.state.hover) {
                return { backgroundColor: this.props.slot.status.color, transition: '.5s'}
            }
        }
    }

    seatedSlotSelect = () => {
        this.props.changeSeatedSlot(this.props.slot)
        this.setState({
            hover: !this.state.hover
        })
    }
    seatedSlotUnSelect = () => {
        this.props.changeSeatedSlot({})
        this.setState({
            hover: !this.state.hover
        })
    }

    // manages seated table
    onDropCaptureHandler = () => {
        if (this.props.currentTable) {
            let updatedBook = {...this.props.currentBook}
            let updatedSlot = updatedBook.slots.find(slot => slot.id === this.props.seatedSlot.id)
            updatedSlot.status = this.props.statuses.find(status => status.name === 'Seated')
            updatedSlot.status.status_type = "Seated"

            let updatedTable = updatedBook.floors[0].tables.find(table => table.id === this.props.currentTable.id)
            updatedTable.status = {...updatedSlot.status}
            updatedTable.reservation = updatedSlot.id

            this.props.patchBook(updatedBook)
            this.props.patchTable(updatedTable)
            this.props.patchSlot(updatedSlot)
        }
    }


    render() {
        return(
            <div className="slot-container"
                 onDoubleClick={this.clickHandler}
                 style={this.renderStyle()}
                 onMouseEnter={this.seatedSlotSelect}
                 onMouseLeave={this.seatedSlotUnSelect}
                 draggable={true}
                 onDragEnd={this.onDropCaptureHandler}
            >
                <span>{this.props.slot.time}</span>
                <span>{this.props.slot.party_size}</span>
                {
                    this.props.slot.guest ?
                        <>
                            <span>
                                {this.props.slot.guest.first_name + "  "}
                                {this.props.slot.guest.last_name}
                            </span>
                            <span>{this.props.slot.guest.phone_number}</span>
                            <span>{this.props.slot.reservation_notes}</span>
                        </>
                        :
                        null
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    statuses: state.status.statuses,
    seatedSlot: state.slot.seatedSlot,
    currentTable: state.table.currentTable
})

export default connect(mapStateToProps, {
    changeSlot, changeGuest, changeSeatedSlot, patchTable, patchSlot, patchBook })(Slot);