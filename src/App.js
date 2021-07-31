import React from 'react'
import './Stylesheets/App.css'
import { Route, Redirect } from "react-router-dom";
import { getBook } from "./Actions/Book";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from "./Components/Navbar";

class App extends React.Component {

  static propTypes = {
    currentBook: PropTypes.array.isRequired,
  }

  componentDidMount = () => {
    this.props.getBook(Date.now())
  }

  render() {
    return (
        <div className="app-wrapper">
            <Navbar />
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
  currentBook: state.book.currentBook,
  currentNavbar: state.navbar.currentNavbar
})

export default connect(mapStateToProps, { getBook })(App);
