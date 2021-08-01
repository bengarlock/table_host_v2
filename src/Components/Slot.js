import React from 'react'
import "../Stylesheets/Slot.css"
import PropTypes from 'prop-types';
import { changeSlot } from "../Actions/Slot";
import { connect } from "react-redux";



class Slot extends React.Component {

    static propTypes = {
        currentSlot: PropTypes.array.isRequired
    }

    clickHandler = () => {
        this.props.changeSlot([this.props.slot])
    }

    render() {
        return(
            <div className="slot-container" onClick={this.clickHandler}>
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
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentSlot: state.book.currentBook,
})

export default connect(mapStateToProps, { changeSlot })(Slot);