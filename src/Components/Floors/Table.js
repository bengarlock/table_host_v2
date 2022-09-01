import React from 'react'
import '../../Stylesheets/App.css'
import { patchTable, changeSelectedTable } from "../../Actions/Table";
import { patchSlot, changeSeatedSlot } from "../../Actions/Slot";
import { patchBook } from "../../Actions/Book"
import { changeRenderStatusForm } from "../../Actions/Status"

import { connect } from "react-redux";
import PropTypes from "prop-types";

class Table extends React.Component {

    static propTypes = {
        currentTable: PropTypes.object.isRequired,
        seatedSlot: PropTypes.object.isRequired,
        statuses: PropTypes.array.isRequired,
        renderStatusForm: PropTypes.bool.isRequired
    }

    state = {
        left: 400,
        top: 50,
        width: 50,
        height: 50,
        color: "darkGrey",
        status: {},
        edit_mode: false,
        select_mode: false,
        border: false
    }

    componentDidMount = () => {
        this.setState({
                left: this.props.table.left < 400 ? 400 : this.props.table.left,
                top: this.props.table.top < 50 ? 50 : this.props.table.top,
                width: this.props.table.width,
                height: this.props.table.height,
            })

    }

    onMouseDownHandler = (e) => {
        console.log('mouse down')
        window.addEventListener("mousemove", this.onMouseMoveHandler)
        window.addEventListener("mouseup", this.onMouseUpHandler)
        if (e.target.className === 'table') {
            this.onMouseMoveHandler(e)
        }
    }

    onMouseUpHandler = () => {
        if (this.props.currentTable) {
            let table = {...this.props.table}
            table.left = this.state.left
            table.top = this.state.top
            table.width = this.state.width
            table.height = this.state.height
            table.reservation = this.props.reservation ? this.props.reservation.id : null
            this.props.patchTable(table)
            window.removeEventListener("mousemove", this.onMouseMoveHandler)
            window.removeEventListener("mouseup", this.onMouseUpHandler)
        }

    }


    onMouseMoveHandler = (e) => {
        this.setState({
            left: this.state.left + e.movementX,
            top: this.state.top + e.movementY
        })
    }




    onDragEnter = (event) => {
        event.preventDefault()
        this.props.changeSelectedTable(this.props.table)
    }

    onDragOver = (event) => {
        event.preventDefault()
    }

    onDragLeaveHandler = (event) => {
        event.preventDefault()
        this.props.changeSelectedTable({})
    }

    onDropHandler = (event) => {
        event.preventDefault()
        if (this.props.seatedSlot.id && this.props.currentTable.id) {
            let updatedBook = {...this.props.currentBook}
            let newSeatedSlot = updatedBook.slots.find(slot => slot.id === this.props.seatedSlot.id)
            let newCurrentTable = updatedBook.floors[0].tables.find(table => table.id === this.props.currentTable.id)

            // update slot to seated
            newSeatedSlot.status = this.props.statuses.find(status => status.name === 'Seated')
            newSeatedSlot.status.status_type = "Seated"

            // update current table to seated
            newCurrentTable.status = newSeatedSlot.status
            newCurrentTable.reservation = newSeatedSlot

            this.props.patchTable(newCurrentTable)
            this.props.patchSlot(newSeatedSlot)
            this.props.patchBook(updatedBook)

            this.props.changeSeatedSlot({})
            this.props.changeSelectedTable({})
        }
    }

    onClickHandler = () => {
        this.setState({
            border: !this.state.border
        })

    }

    onDoubleClickHandler = () => {
        if (this.props.table.reservation) {
            this.props.changeSelectedTable({...this.props.table})
            this.props.changeRenderStatusForm(true)
        }

    }


    render() {
        return(
            <div className="table" style={{
                left:this.state.left,
                top: this.state.top,
                border: this.state.border ? "solid black" : null,
                background: this.props.table.status ? this.props.table.status.color : null
            }}
                 onMouseDown={this.props.editMode ? this.onMouseDownHandler : null}
                 onMouseUp={this.props.editMode ? this.onMouseUpHandler : null}
                 onDragOver={this.onDragOver}
                 onDragEnter={this.onDragEnter}
                 onDragLeave={this.onDragLeaveHandler}
                 onDrop={this.onDropHandler}
                 onClick={this.state.select_mode ? this.onClickHandler : null}
                 onDoubleClick={this.onDoubleClickHandler}
            >
                {this.props.table.name}

                {this.state.edit_mode ?
                    <>
                        <div className="resizer nw" onMouseDown={this.onMouseDownHandler}/>
                        <div className="resizer ne" onMouseDown={this.onMouseDownHandler}/>
                        <div className="resizer sw" onMouseDown={this.onMouseDownHandler}/>
                        <div className="resizer se" onMouseDown={this.onMouseDownHandler}/>
                    </>
                     : null }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    seatedSlot: state.slot.seatedSlot,
    currentTable: state.table.currentTable,
    hoverSlot: state.slot.hoverSlot,
    statuses: state.status.statuses,
    renderStatusForm: state.status.renderStatusForm
})

export default connect(mapStateToProps, {
    patchTable, changeSelectedTable, patchSlot , changeSeatedSlot, patchBook, changeRenderStatusForm})(Table)