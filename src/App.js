import React from 'react'
import './Stylesheets/App.css'
import { Route, Redirect } from "react-router-dom";
import { getBook, setDate } from "./Actions/Book";
import { getStatuses } from "./Actions/Status";
import { connect } from 'react-redux';
import { changeNavbar } from "./Actions/Navbar"
import PropTypes from 'prop-types';
import Navbar from "./Components/Navbar";
import Datepicker from "./Components/Datepicker";
import Book from "./Components/Books/Book"
import Floor from "./Components/Floors/FloorPlanView";

class App extends React.Component {

  static propTypes = {
    currentBook: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
      const today = new Date();
      this.props.getBook(today)
      this.props.setDate(today)
      this.props.getStatuses()
  }



  render() {
      return (
          <div className="app-wrapper">
              <Datepicker />
              <Navbar />
              <Route exact path="/tablehost" id="book" render={ () => <Book /> } />
              <Route exact path="/tablehost/floor" id="floor" render={ () => <Floor /> } />
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

export default connect(mapStateToProps, { getBook, getStatuses, setDate, changeNavbar })(App);
