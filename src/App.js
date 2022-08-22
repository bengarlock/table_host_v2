import React from 'react'
import './Stylesheets/App.css'
import { Route } from "react-router-dom";
import { getBook, setDate } from "./Actions/Book";
import { getStatuses } from "./Actions/Status";
import { getSettings } from "./Actions/Settings"
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
      this.props.getBook(new Date())
      this.props.setDate(new Date())
      this.props.getStatuses()
  }


  render() {
      // console.log(this.props.currentBook)
      return (
          <div className="app-wrapper">
              <Datepicker />
              <div className="content-wrapper">
                  <Navbar />
                  <Route exact path="/tablehost" id="book" render={ () => <Book /> } />
                  <Route exact path="/tablehost/floor" id="floor" render={ () => <Floor /> } />
                  {/*<Route exact path="/tablehost/guests" render={ () => <Guest /> } />*/}
                  {/*<Route exact path="/tablehost/reports" render={ () => <Report /> } />*/}
              </div>

          </div>
      )
  }
}

const mapStateToProps = (state) => ({
    currentBook: state.book.currentBook,
    currentNavbar: state.navbar.currentNavbar,
})

export default connect(mapStateToProps, {
    getBook, getStatuses, setDate, changeNavbar, getSettings })(App);
