import React from 'react'
import '../../Stylesheets/App.css'

class Floor extends React.Component {


    renderTables = () => {

    }

    onClickHandler = (e) => {
        if (e.target.id === 'add') {
            const root = document.getElementById('table-root')
            const table = React.createElement('div', {className: "table"})
            console.log(table)

            root.appendChild(table)









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



    render() {
        return(
            <div id="table-root">
                <button id="add" onClick={this.onClickHandler}>+</button>
            </div>

        )
    }
}

export default Floor

