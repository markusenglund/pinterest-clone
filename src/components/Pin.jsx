import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { deletePicture, putLike } from "../actionCreators"
import PinModal from "./PinModal"

class Pin extends Component {
  handleDelete(id) {
    const { dispatch } = this.props
    dispatch(deletePicture(id))
  }

  handleLike(id) {
    const { dispatch, user } = this.props
    dispatch(putLike(id, user))
  }

  render() {
    const { pic, user } = this.props
    return (
      <div>
        <div className="image-element">
          <PinModal pic={pic} />
          <div className="image-description">{pic.description}</div>
          <NavLink className="user-link" to={`/user/${pic.uploadedBy._id}`}>
            <img
              className="user-image"
              src={pic.uploadedBy.image}
              alt={pic.uploadedBy.displayName}
              title={pic.uploadedBy.displayName}
            />
          </NavLink>
          <div className="image-buttons">
            {user === pic.uploadedBy._id
              ? <span onClick={() => this.handleDelete(pic._id)} className="image-button">
                <i className="fa fa-trash-o" aria-hidden="true" />
              </span>
              : null
            }
            {user
              ? <span onClick={() => this.handleLike(pic._id)} className="image-button">
                <i
                  className="fa fa-thumbs-up"
                  style={pic.likedBy.includes(user) ? { color: "#44d" } : null}
                  aria-hidden="true"
                />
                <span>{pic.likedBy.length}</span>
              </span>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

Pin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.string,
  pic: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    uploadedBy: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired
}
Pin.defaultProps = { user: null }

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Pin)
