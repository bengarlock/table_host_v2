import React from 'react'
import '../../Stylesheets/App.css'
import Table from "./Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { patchBook } from "../../Actions/Book";
import { patchTable } from "../../Actions/Table";


class Floor extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired
    }

    state = {
        tables: [],
        floorEditMode: false
    }

    componentDidMount = () => {
        this.setState({
            tables: this.props.floor.tables
        })
    }

    createTable = async () => {
        const mostRecentName = Number(this.state.tables.map(table => Number(table.name)).sort().slice(-1).pop()) + 1
        let table = {
            background_color: "#9b9b9b",
            border: "\"2px solid gray\"",
            class_name: "table",
            height: 50,
            left: 400,
            name: String(mostRecentName),
            status: "open",
            top: 262,
            width: 50,
            floor: this.props.floor.id
        }

        const packet = {
            method: "post",
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(table)
        }

        const response = await fetch(`https://bengarlock.com/api/v1/tablehost/tables/`, packet)
        let newTable = await response.json()

        table.id = newTable.id

        this.setState({
            tables: [...this.state.tables, table]
        })

    }

    onClickHandler = (e) => {
        if (e.target.id === 'add') {
            this.createTable()
        }
    }

    syncSlotsAndFloor = () => {
        // Examines tables for attached reservations. Corrects seating status if reservation is unseated.
        let currentBook = {...this.props.currentBook}
        let currentFloor = currentBook.floors.find(floor => floor.id === this.props.floor.id)
        let seatedTables = currentFloor.tables.filter(table => table.reservation)

        seatedTables.forEach(table => {
            if (table.reservation.status) {
                if (table.reservation.status.status_type === 'reservation') {
                    table.reservation = null
                    table.status = null
                    this.props.patchTable(table)
               }
            }
        })
        return true

    }

    toggleEditMode = () => {
        this.setState({
            floorEditMode: !this.state.floorEditMode
        })
    }

    renderTables = () => {
        return this.state.tables.map(table => <Table
            key={table.id}
            editMode={this.state.floorEditMode}
            table={table} /> )
    }

    render() {

        return(
            <div id="table-root">
                <button className='floor-edit-button' onClick={this.toggleEditMode}>{this.state.floorEditMode ? "SAVE" : "EDIT"}</button>
                {this.state.floorEditMode ? <button id="add" onClick={this.onClickHandler}>+</button> : null}

                {this.renderTables()}
                {this.syncSlotsAndFloor()}
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook
})

export default connect(mapStateToProps, { patchBook, patchTable })(Floor)

