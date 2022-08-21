import React from 'react'
import { changeRenderStatusForm } from "../../Actions/Status"
import { connect } from "react-redux";
import propTypes from "prop-types";
import StatusButton from "./StatusButton";
import { patchTable, changeSelectedTable } from "../../Actions/Table";


class StatusForm extends React.Component {

    static propTypes = {
        renderStatusForm: propTypes.bool.isRequired,
        statuses: propTypes.array.isRequired
    }

    onClickHandler = () => {
        this.props.changeRenderStatusForm(!this.props.renderStatusForm)
        this.props.changeSelectedTable({})
    }

    renderStatuses = () =>  {
        if (this.props.statuses) {
            let seatedStatuses = this.props.statuses.filter(status => status.status_type === 'seated')
            return seatedStatuses.map(status => <StatusButton key={status.id} status={status}/>)
        }
    }

    render() {
        return (
            <>
                <div className="overlay" id="overlay" onClick={this.onClickHandler} />
                <div className="form-wrapper">
                    <div className="statuses-wrapper">
                        {this.renderStatuses()}
                    </div>
                </div>
            </>

        )
    }
}

const mapStateToProps = (state) => ({
    renderStatusForm: state.status.renderStatusForm,
    statuses: state.status.statuses
})

export default connect(mapStateToProps, {
    changeRenderStatusForm, patchTable, changeSelectedTable })(StatusForm)