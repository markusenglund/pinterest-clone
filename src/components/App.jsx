import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Cookies from "js-cookie"

import { getPictures, readCookie } from "../actionCreators"
import Header from "./Header"
import Home from "./Home"
import User from "./User"
import NoMatch from "./NoMatch"

class App extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props
    dispatch(readCookie(Cookies.get("user")))
    dispatch(getPictures())
  }

  render() {
    const { user } = this.props
    return (
      <Router>
        <div>
          <Header user={user} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:id" component={User} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

App.propTypes = { dispatch: PropTypes.func.isRequired, user: PropTypes.string }
App.defaultProps = { user: null }

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(App)
