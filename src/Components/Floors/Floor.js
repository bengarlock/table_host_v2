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




            // const div = document.createElement('div')
            // div.className = 'table'
            // const nwDiv = document.createElement('div')
            // nwDiv.className = "resizer nw"
            // const neDiv = document.createElement('div')
            // neDiv.className = "resizer ne"
            // const swDiv = document.createElement('div')
            // swDiv.className = "resizer sw"
            // const seDiv = document.createElement('div')
            // seDiv.className = "resizer se"
            // div.appendChild(nwDiv)
            // div.appendChild(neDiv)
            // div.appendChild(swDiv)
            // div.appendChild(seDiv)
            // root.appendChild(div)
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

