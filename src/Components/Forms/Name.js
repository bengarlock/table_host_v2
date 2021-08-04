import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { changeGuest } from "../../Actions/Guest";

class Name extends React.Component {

    static propTypes = {
        currentGuest: PropTypes.array.isRequired
    }

    onClickHandler = () => {
        this.props.changeGuest([this.props.name])
    }

    render() {

        return(
            <div className="slot-container" onClick={this.onClickHandler}>
                {this.props.name.first_name} {this.props.name.last_name} {this.props.name.phone_number}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentGuest: state.guest.currentGuest,
})

export default connect(mapStateToProps, { changeGuest })(Name);
