import React from 'react'
import '../../Stylesheets/App.css'


class Table extends React.Component {

    state = {
        left: 400,
        top: 50,
        width: 50,
        height: 50
    }


    onMouseDownHandler = (e) => {
        if (e.target.className === 'table') {
            this.onMouseDownHandler(e)
        } else if (e.target.className.includes('resizer')) {
            this.resize(e.target)
        }
    }

    onMouseDownHandler = (e) => {
        window.addEventListener("mousemove", this.onMouseMoveHandler)
        window.addEventListener("mouseup", this.onMouseUpHandler)
    }

    onMouseUpHandler = () => {
        window.removeEventListener("mousemove", this.onMouseMoveHandler)
        window.removeEventListener("mouseup", this.onMouseUpHandler)



    }


    onMouseMoveHandler = (e) => {
        this.setState({
            left: this.state.left + e.movementX,
            top: this.state.top + e.movementY
        })
    }


    resize = (item) => {

        const box = item.parentElement

        window.addEventListener('mousemove', mousemove)
        window.addEventListener('mouseup', mouseup)

        let prevX = box.clientX;
        let prevY = box.clientY;

        function mousemove(e) {
            const rect = box.getBoundingClientRect()

            if (item.classList.contains('se')) {
                box.style.width = rect.width - (prevX - e.clientX) + 'px'
                box.style.height = rect.height - (prevY - e.clientY) + 'px'
            } else if (item.classList.contains('sw')) {
                box.style.width = rect.width + (prevX - e.clientX) + 'px'
                box.style.height = rect.height - (prevY - e.clientY) + 'px'
                box.style.left = rect.left - (prevX - e.clientX) + 'px'
            } else if (item.classList.contains('ne')) {
                box.style.width = rect.width - (prevX - e.clientX) + 'px'
                box.style.height = rect.height + (prevY - e.clientY) + 'px'
                box.style.top = rect.top - (prevY - e.clientY) + 'px'
            } else if (item.classList.contains('nw')) {
                box.style.width = rect.width + (prevX - e.clientX) + 'px'
                box.style.height = rect.height + (prevY - e.clientY) + 'px'
                box.style.top = rect.top - (prevY - e.clientY) + 'px'
                box.style.left = rect.left - (prevX - e.clientX) + 'px'
            }

            prevX = e.clientX;
            prevY = e.clientY
            console.log(item.parentElement)

        }

        function mouseup() {
            window.removeEventListener('mousemove', mousemove)
            window.removeEventListener('mouseup', mouseup)
        }
    }


    render() {
        return(
            <div className="table" style={{left:this.state.left, top: this.state.top}}
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 // onMouseMove={this.onMouseMoveHandler}
            >
                <div className="resizer nw" onMouseDown={this.onMouseDownHandler}/>
                <div className="resizer ne" onMouseDown={this.onMouseDownHandler}/>
                <div className="resizer sw" onMouseDown={this.onMouseDownHandler}/>
                <div className="resizer se" onMouseDown={this.onMouseDownHandler}/>
            </div>
        )
    }
}

export default Table