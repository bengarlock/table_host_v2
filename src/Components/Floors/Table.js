import React from 'react'
import '../../Stylesheets/App.css'
import { patchTable, changeSeatedTable } from "../../Actions/Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Table extends React.Component {

    static propTypes = {
        currentTable: PropTypes.object.isRequired,
    }

    state = {
        left: 400,
        top: 50,
        width: 50,
        height: 50,
        color: "darkGrey",
        status: {}
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
        window.addEventListener("mousemove", this.onMouseMoveHandler)
        window.addEventListener("mouseup", this.onMouseUpHandler)
        if (e.target.className === 'table') {
            this.onMouseMoveHandler(e)
        }
    }

    onMouseUpHandler = () => {
        if (this.props.currentTable) {
            let table = this.props.table
            table.left = this.state.left
            table.top = this.state.top
            table.width = this.state.width
            table.height = this.state.height
            this.props.patchTable(table)
            window.removeEventListener("mousemove", this.onMouseMoveHandler)
            window.removeEventListener("mouseup", this.onMouseUpHandler)
        }

    }

    onMouseOverHandler = () => {
        this.props.changeSeatedTable(this.props.table)
    }

    onMouseMoveHandler = (e) => {
        this.setState({
            left: this.state.left + e.movementX,
            top: this.state.top + e.movementY
        })
    }

    onDragOverHandler = () => {
        console.log("Dragging over me!!")
        this.props.changeSeatedTable(this.props.table)
    }

    onMouseLeaveHandler = () => {
        this.props.changeSeatedTable({})
    }

    onDropCaptureHandler = (e) => {
        e.preventDefault()
        console.log("drop!")

        // const table = this.props.currentTable
        // table.stauts = "seated"
        // table.background_color = "pink"
        // this.props.updateTable(table)
        // update slot to seated and booked

    }


    render() {
        return(
            <div className="table" style={{
                left:this.state.left,
                top: this.state.top,
                background: this.props.table.status ? this.props.table.status.color : null
            }}
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onMouseOver={this.onMouseOverHandler}
                 onMouseLeave={this.onMouseLeaveHandler}
                 // onDragLeave={this.onMouseLeaveHandler}
                 onDragOverCapture={this.onDragOverHandler}
                 onDropCapture={this.onDropCaptureHandler}
            >
                {this.props.table.name}


                <div className="resizer nw" onMouseDown={this.onMouseDownHandler}/>
                <div className="resizer ne" onMouseDown={this.onMouseDownHandler}/>
                <div className="resizer sw" onMouseDown={this.onMouseDownHandler}/>
                <div className="resizer se" onMouseDown={this.onMouseDownHandler}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentSlot: state.slot.currentSlot,
    currentTable: state.table.currentTable,
    hoverSlot: state.slot.hoverSlot
})

export default connect(mapStateToProps, { patchTable, changeSeatedTable })(Table)