import React from "react"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

const Header = ({ user }) => {
  return (
    <div className="header">
      <NavLink exact to="/">All images</NavLink>
      {user ?
        <NavLink to={`/user/${user}`}>My images</NavLink> :
        <a href="/auth/twitter"><i className="fa fa-twitter" aria-hidden="true" /> Sign in</a>
      }
    </div>
  )
}

Header.propTypes = { user: PropTypes.string }
Header.defaultProps = { user: null }

export default Header
