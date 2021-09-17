import React from 'react'


class Table extends React.Component {

    onDragEnter = (e) => {
        let table = e.target
        table.style.backgroundColor = "#162a4b"
    }

    onDragExit = (e) => {
        let table = e.target
        table.style.backgroundColor = this.props.table.style.background_color
    }

    renderStyle = () => {
        console.log(this.props.table.style.width)
        return {
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
            userSelect: "none",

            width: this.props.table.style.width,
            height: this.props.table.style.height,
            backgroundColor: this.props.table.style.background_color,
            border: this.props.table.style.border,
            top: this.props.table.style.top,
            left: this.props.table.style.left
        }
    }

    renderClass = () => {
        return this.props.table.class_name
    }

    render() {
        return(
            <div>
                <div className={this.renderClass()}
                     style={this.renderStyle()}
                     onDragEnter={this.onDragEnter} onDragLeave={this.onDragExit}>

                    {this.props.table.name}

                </div>
            </div>
        )
    }
}

export default Table