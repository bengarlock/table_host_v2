import React from 'react'
import "../Stylesheets/ReservationForm.css"
import { connect } from "react-redux";
import { changeSlot } from "../Actions/Slot";
import PropTypes from "prop-types";


class ReservationForm extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.array.isRequired
    }



    render() {
        console.log("form rendered")

        return(
            <div>
                {this.props.currentSlot ?
                    <div className="form-wrapper">
                        RESERVATION EXISTING FORM
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