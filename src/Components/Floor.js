import React from 'react'
import "../Stylesheets/Floor.css"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Slot from "./Slot";
import ReservationForm from "./ReservationForm";
import Table from "./Table";

class Floor extends React.Component {

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        currentSlot: PropTypes.array.isRequired,
        hoverSlot: PropTypes.array.isRequired
    }

    renderReservations = () => {
        if (this.props.currentBook[0]) {
            const reservations = this.props.currentBook[0].slots.filter(reservation =>
                reservation.booked
            )
            return reservations.map(slot => <Slot key={slot.id} slot={slot}/>)
        }
    }

    resizeHandler = (e) => {
        console.log(e.target)
    }



    renderTables = () => {
        const tables = [
            {
                id: 1,
                name: "1",
                style: {
                    class_name: "table",
                    width: "50px",
                    height: "50px",
                    top: "100px",
                    left: "500px",
                    background_color: "#9b9b9b",
                    border: "2px solid gray"
                }
            }]
        return tables.map(table => <Table key={table.id} table={table} />)
    }


    render() {
        return(
            <div className="floor-wrapper">
                <div className="floor-reservations-wrapper">
                    <div className="floor-reservations-header">Reservations</div>
                    <div>
                        {this.renderReservations()}
                    </div>
                </div>
                <div className="slider" onMouseOver={this.resizeHandler}>
                </div>
                <div className="floor-tables-wrapper">

                    {this.renderTables()}

                </div>
                {this.props.currentSlot[0] ? <div className="reservation-floor-wrapper"> <ReservationForm /> </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    hoverSlot: state.slot.hoverSlot
})

export default connect(mapStateToProps)(Floor)
