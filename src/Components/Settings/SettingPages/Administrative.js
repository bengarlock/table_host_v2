import React from 'react'
import '../../../Stylesheets/App.css'
import { connect } from "react-redux";
import { endpoint } from "../../../endpoint";
import {getBook} from '../../../Actions/Book'

class Administrative extends React.Component {

    state = {
        confirm: false
    }

    onClickHandler = () => {
        if (!this.state.confirm) {
            this.setState({
                confirm: !this.state.confirm
            })
        } else {
            this.resetDatabase()
            this.setState({
                confirm: !this.state.confirm
            })
        }
    }

    resetDatabase = () => {
        const packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({'request': 'reseed'})
        }

        fetch(`${endpoint}v1/tablehost/settings/`, packet)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        window.location.reload();
        this.props.getBook()
    }

    render() {
        return(
            <div className="page-container">

                {this.state.confirm ?
                    <button className="status-button"  style={{backgroundColor: "red"}}
                            onClick={this.onClickHandler}>Are you sure?</button>
                    :

                    <button className="status-button" onClick={this.onClickHandler}>Reset Database</button>}
            </div>
        )
    }
}

const mapStateToProps = () => ({
})

export default connect(mapStateToProps, { getBook })(Administrative);