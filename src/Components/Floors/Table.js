import React from 'react'
import '../../Stylesheets/App.css'

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


    mousemove = (e) => {
        this.setState({
            left: e.screenX,
            top: e.screenY
        })
    }

    mouseup = () => {
        window.removeEventListener('mousemove', this.mousemove)
        window.removeEventListener('mouseup', this.mouseup)
    }

    drag = (e) => {
        window.addEventListener('mousemove', this.mousemove)
        window.addEventListener('mouseup', this.mouseup)

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
        console.log(this.state)
        return(
            <div className="table" style={{top: this.state.top + 'px', left:this.state.left + 'px'}}
                 onMouseDown={this.onMouseDownHandler}>

                <div className="resizer nw"/>
                <div className="resizer ne"/>
                <div className="resizer sw"/>
                <div className="resizer se"/>
            </div>
        )
    }
}

export default Table