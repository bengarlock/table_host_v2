import React from 'react'
import '../../Stylesheets/App.css'
import { updateTable } from "../../Actions/Table";
import { connect } from "react-redux";

class Table extends React.Component {

    state = {
        left: 400,
        top: 50,
        width: 50,
        height: 50
    }

    componentDidMount = () => {
        this.setState({
            left: this.props.table.left < 400 ? 400 : this.props.table.left,
            top: this.props.table.top < 50 ? 50 : this.props.table.top,
            width: this.props.table.width,
            height: this.props.table.height
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

    render() {
        return(
            <div className="table" style={{left:this.state.left, top: this.state.top}}
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
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
    hoverSlot: state.slot.hoverSlot
})

export default connect(mapStateToProps, { updateTable })(Table)