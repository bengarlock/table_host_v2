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

    onClickHandler = (e) => {
        if (e.target.id === 'add') {
            const table = React.createElement('div', {className: "table"})
            this.setState({
                tables: [...this.state.tables, table]
            })
        }
    }

    renderTables = () => {
        return this.props.floor.tables.map(table => <Table key={table.id} table={table} /> )
    }



    render() {
        console.log(this.props.floor)
        return(
            <div id="table-root">
                <button id="add" onClick={this.onClickHandler}>+</button>
                {this.renderTables()}
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook
})

export default connect(mapStateToProps)(Floor)

