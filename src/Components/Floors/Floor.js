import React from 'react'
import '../../Stylesheets/App.css'
import Table from "./Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Floor extends React.Component {

    static propTypes = {
        currentBook: PropTypes.object.isRequired
    }

    state = {
        tables: []
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
        // Examines tables for attached reservations. Corrects seating status if reservation is removed.
        //
        // console.log(this.state)
        // let tablesWithStatuses = this.state.tables.filter(table => table.status)
        // console.log(tablesWithStatuses)


        // let seatedTable = this.state.tables.filter(table => table.reservation)
        // seatedTable.forEach(table => {
        //     if (!table.reservation.status) {
        //         console.log(';')
        //         table.status = null
        //     } else if (table.reservation.status.status_type === 'reservation') {
        //         table.status = null
        //         table.reservation = null
        //     }

        // })




    }

    renderTables = () => {
        return this.state.tables.map(table => <Table key={table.id} table={table} /> )
    }

    render() {

        return(
            <div id="table-root">
                <button id="add" onClick={this.onClickHandler}>+</button>
                {this.renderTables()}
                {this.syncSlotsAndFloor()}
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook
})

export default connect(mapStateToProps)(Floor)

