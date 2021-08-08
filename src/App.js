import React from 'react'
import './Stylesheets/App.css'
// import { Route, Redirect } from "react-router-dom";
import { getBook } from "./Actions/Book";
import { getStatuses } from "./Actions/Status";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from "./Components/Navbar";
import Datepicker from "./Components/Datepicker";
import {Route} from "react-router-dom";
import Book from "./Components/Book"
import Floor from "./Components/Floor";

class App extends React.Component {

  static propTypes = {
    currentBook: PropTypes.array.isRequired,
  }

  componentDidMount = () => {
      this.props.getBook(Date.now())
      this.props.getStatuses()
  }

  render() {
    return (
        <div className="app-wrapper">
            <Datepicker />
            <Navbar />
            <Route exact path="/tablehost" render={ () => <Book /> } />
            <Route exact path="/tablehost/floor" render={ () => <Floor /> } />
            {/*<Route exact path="/tablehost/guests" render={ () => <Guest /> } />*/}
            {/*<Route exact path="/tablehost/reports" render={ () => <Report /> } />*/}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
  currentBook: state.book.currentBook,
  currentNavbar: state.navbar.currentNavbar
})

export default connect(mapStateToProps, { getBook, getStatuses })(App);
