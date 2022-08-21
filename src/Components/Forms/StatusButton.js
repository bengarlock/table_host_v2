import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { patchBook } from "../../Actions/Book"
import { patchTable } from "../../Actions/Table";
import { patchSlot } from "../../Actions/Slot";
import { changeRenderStatusForm } from "../../Actions/Status"
import { changeSelectedTable } from "../../Actions/Table";


class StatusButton extends React.Component {
    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentTable: PropTypes.object.isRequired,
        renderStatusForm: PropTypes.bool.isRequired
    }

    processDone = () => {


    }

    onClickHandler = () => {
        let updatedBook = {...this.props.currentBook}

        let newSeatedSlot = updatedBook.slots.find(slot => slot.id === this.props.currentTable.reservation.id)
        let newCurrentTable = updatedBook.floors[0].tables.find(table => table.id === this.props.currentTable.id)

        newSeatedSlot.status = this.props.status
        newCurrentTable.status = this.props.status

        if (this.props.status.name === "Done") {
            newSeatedSlot.status = this.props.status
            newCurrentTable.status = null
            newCurrentTable.reservation = null
        }

        this.props.patchTable(newCurrentTable)
        this.props.patchSlot(newSeatedSlot)
        this.props.patchBook(updatedBook)
        this.props.changeRenderStatusForm(!this.props.renderStatusForm)

        this.props.changeSelectedTable({})
    }

    render() {
        return(
            <div className="status-button" onClick={this.onClickHandler} style={{backgroundColor: this.props.status.color}}>
                {this.props.status.name}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentTable: state.table.currentTable,
    renderStatusForm: state.status.renderStatusForm
})

export default connect(mapStateToProps, {
    patchBook, patchTable, patchSlot, changeRenderStatusForm, changeSelectedTable })(StatusButton)