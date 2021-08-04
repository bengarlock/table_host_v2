import React from 'react'
import "../../Stylesheets/ReservationForm.css"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeSlot} from "../../Actions/Slot";
import Name from "./Name";

class NewReservation extends React.Component {

    state = {
        search: '',
        searchResults: []
    }

    static propTypes = {
        currentSlot: PropTypes.array.isRequired
    }

    onClickHandler = (e) => {
        if (e.target.id === "overlay") {
            this.props.changeSlot([])
        }
    }

    searchGuest = () => {
        return this.state.searchResults.map(name => <Name key={name.id} name={name}/>)
    }

    onChangeHandler = async (e) => {
        if (e.target.name === "search") {
            await this.setState({
                search: e.target.value,
            })

            let response = await fetch("https://bengarlock.com/api/v1/tablehost/guests/?search=" + this.state.search)
            let searchResults = await response.json()
            this.setState({
                searchResults: searchResults
            })
        }
    }

    render() {
        return(
            <>
                <div className="overlay" id="overlay" onClick={this.onClickHandler} />
                <div className="form-wrapper">
                    <h3>NEW RESERVATION</h3>

                    <div className="search-results-wrapper">
                        <form>
                            <input name="search"
                                   type="text"
                                   value={this.state.search}
                                   onChange={this.onChangeHandler}
                                   autoComplete="off"
                                   placeholder="Guest Search" />
                        </form>
                        <div className="search-results">
                            {this.state.search.length > 0 ? this.searchGuest() : null }
                        </div>

                    </div>
                </div>
            </>

        )
    }
}

const mapStateToProps = (state) => ({
    currentSlot: state.book.currentBook,
})


export default connect(mapStateToProps, { changeSlot })(NewReservation);