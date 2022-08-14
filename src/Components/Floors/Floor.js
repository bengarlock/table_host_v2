import React from 'react'
import '../../Stylesheets/App.css'
import Table from "./Table";

class Floor extends React.Component {

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
        return this.state.tables.map(table => <Table key={this.state.tables.indexOf(table)} table={table} /> )
    }



    render() {
        return(
            <div id="table-root">
                <button id="add" onClick={this.onClickHandler}>+</button>
                {this.renderTables()}
            </div>

        )
    }
}

export default Floor

