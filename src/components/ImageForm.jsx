import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { postPicture } from "../actionCreators"

class ImageForm extends Component {
  constructor() {
    super()
    this.state = { description: "", link: "" }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { dispatch, closeModal } = this.props
    closeModal()
    dispatch(postPicture(this.state))
    this.setState({ description: "", link: "" })
  }

  render() {
    const { closeModal } = this.props
    return (
      <div>
        <div className="form-image-wrapper">
          {this.state.link
            ? <img className="form-image" src={this.state.link} alt="Your link" />
            : <div className="form-image-placeholder" />
          }
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="link">Image source</label>
            <input
              className="form-control"
              placeholder="http://example.com/picture-of-a-cat.jpg"
              type="text"
              value={this.state.link}
              name="link"
              onChange={e => this.handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              className="form-control"
              placeholder="Picture of a cat"
              type="text"
              value={this.state.description}
              name="description"
              onChange={e => this.handleChange(e)}
              maxLength="100"
              required
            />
          </div>
          <button className="form-button btn btn-default" type="submit">Submit picture</button>
          <button onClick={() => closeModal()} className="form-button btn btn-danger">
            Cancel
          </button>
        </form>
      </div>
    )
  }
}

ImageForm.propTypes = { dispatch: PropTypes.func.isRequired, closeModal: PropTypes.func.isRequired }

export default connect()(ImageForm)
