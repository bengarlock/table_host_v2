import React from 'react'
import '../../Stylesheets/App.css'

class Table extends React.Component {

    onMouseDownHandler = (e) => {
        if (e.target.className === 'table') {
            this.drag(e.target)
        } else if (e.target.className.includes('resizer')) {
            this.resize(e.target)
        }
    }

    drag = (table) => {
        window.addEventListener('mousemove', mousemove)
        window.addEventListener('mouseup', mouseup)
        let prevX = table.offsetX;
        let prevY = table.offsetY;
        console.log(table)

        function mousemove(e) {
            let newX = prevX - e.offsetX;
            let newY = prevY - e.offsetY;
            const rect = table.getBoundingClientRect();

            table.style.left = rect.left - newX + 'px';
            table.style.top = rect.top - newY + 'px';

            prevX = table.clientX
            prevY = table.clientY
        }

        function mouseup() {
            window.removeEventListener('mousemove', mousemove)
            window.removeEventListener('mouseup', mouseup)
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

        }

        function mouseup() {
            window.removeEventListener('mousemove', mousemove)
            window.removeEventListener('mouseup', mouseup)
        }
    }


    render() {
        return(
            <div className="table" onMouseDown={this.onMouseDownHandler}>
                <div className="resizer nw"/>
                <div className="resizer ne"/>
                <div className="resizer sw"/>
                <div className="resizer se"/>
            </div>
        )
    }
}

export default Table