import React from 'react'
import "../../Stylesheets/Book.css"
import {connect} from "react-redux";
import { getBook } from "../../Actions/Book";
import PropTypes from "prop-types";
import Slot from "./Slot";
import ReservationForm from "../Forms/ReservationForm";

class Book extends React.Component {

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        currentSlot: PropTypes.array.isRequired
    }

    renderSlots = () => {
        if (this.props.currentBook[0]) {
            return this.props.currentBook[0].slots.map(slot => <Slot key={slot.id} slot={slot}/>)
        } else {
            return "CLOSED"
        }
    }


    render() {
        return(
            <div className="page-container">
                <div className="book-wrapper">
                    <div className="header">
                        <span>AVAILABILITY</span>
                    </div>

                    {this.renderSlots()}
                    {this.props.currentSlot[0] ? <ReservationForm /> : null}
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