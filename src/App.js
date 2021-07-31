import React from 'react'
import './Stylesheets/App.css'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { getBook } from "./Actions/Book";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {

  static propTypes = {
    currentBook: PropTypes.array.isRequired,
  }

  componentDidMount = () => {
    this.props.getBook(Date.now())
  }

  render() {
    return (
        <div>Table Host V2 Baby! </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
  currentBook: state.book.book,
})

export default connect(mapStateToProps, { getBook })(App);
