import React from 'react'
import '../../Stylesheets/App.css'
import {connect} from "react-redux";

class GuestsMain extends React.Component {

    render() {
        return(
            <div className="page-container">
                <div className="placeholder">Guests</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { })(GuestsMain);