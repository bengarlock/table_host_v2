import React from 'react'
import '../../Stylesheets/App.css'
import { updateTable, changeSeatedTable } from "../../Actions/Table";
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
        background: "darkGrey"
    }

    componentDidMount = () => {
        this.setState({
            left: this.props.table.left < 400 ? 400 : this.props.table.left,
            top: this.props.table.top < 50 ? 50 : this.props.table.top,
            width: this.props.table.width,
            height: this.props.table.height,
            background: this.props.table.background_color
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
        let table = this.props.table
        table.left = this.state.left
        table.top = this.state.top
        table.width = this.state.width
        table.height = this.state.height
        this.props.updateTable(table)
        window.removeEventListener("mousemove", this.onMouseMoveHandler)
        window.removeEventListener("mouseup", this.onMouseUpHandler)
    }

    onMouseMoveHandler = (e) => {
        this.setState({
            left: this.state.left + e.movementX,
            top: this.state.top + e.movementY
        })
    }

    onDragOverHandler = () => {
        this.setState({
            background: "pink"
        })
        this.props.changeSeatedTable(this.props.table)
    }

    onMouseLeaveHandler = () => {
        this.setState({
            background: "darkGrey"
        })
    }

    onDropCaptureHandler = () => {
        console.log("drag up")
        if (this.props.currentTable.id){
            console.log(this.props.currentTable)
        }
    }

    render() {
        console.log(this.props.table)
        return(
            <div className="table" style={{
                left:this.state.left,
                top: this.state.top,
                background: this.state.background
            }}
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onDragOver={this.onDragOverHandler}
                 onDragLeave={this.onMouseLeaveHandler}
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

export default connect(mapStateToProps, { updateTable, changeSeatedTable })(Table)