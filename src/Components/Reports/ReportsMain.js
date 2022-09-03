import React from 'react'
import '../../Stylesheets/App.css'
import {connect} from "react-redux";

class ReportMain extends React.Component {

    render() {
        return(
            <div className="page-container">
                <div className="placeholder">Reports</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { })(ReportMain);