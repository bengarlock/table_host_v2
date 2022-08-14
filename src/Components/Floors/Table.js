import React from 'react'
import '../../Stylesheets/App.css'
import Draggable from 'react-draggable'; // The default


class Table extends React.Component {

    state = {
        left: 300,
        top: 20
    }


    onMouseDownHandler = (e) => {
        if (e.target.className === 'table') {
            this.drag(e)
        } else if (e.target.className.includes('resizer')) {
            this.resize(e.target)
        }
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
            <Draggable>
                <div className="table">
                    <div className="resizer nw" onMouseDown={this.onMouseDownHandler}/>
                    <div className="resizer ne" onMouseDown={this.onMouseDownHandler}/>
                    <div className="resizer sw" onMouseDown={this.onMouseDownHandler}/>
                    <div className="resizer se" onMouseDown={this.onMouseDownHandler}/>
                </div>
            </Draggable>

        )
    }
}

export default Table