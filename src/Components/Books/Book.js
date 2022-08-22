import React from 'react'
import '../../Stylesheets/App.css'
import {connect} from "react-redux";
import { getBook } from "../../Actions/Book";
import PropTypes from "prop-types";
import Slot from "./Slot";
import ReservationForm from "../Forms/ReservationForm";

class Book extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentSlot: PropTypes.object.isRequired
    }

    renderSlots = () => {
        if (this.props.currentBook.slots) {
            return this.props.currentBook.slots.map(slot => <Slot key={slot.id} slot={slot}/>)
        } else {
            return "CLOSED"
        }
    }


    render() {
        return(
            <div className="page-container">
                <div className="header">
                    <span>AVAILABILITY</span>
                </div>
                <div className="book-wrapper">
                    {this.renderSlots()}
                    {this.props.currentSlot.id ? <ReservationForm /> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot
})

export default connect(mapStateToProps, { getBook })(Book);