import React, { Component } from "react"
import Modal from "react-modal"
import ImageForm from "./ImageForm"

class FormModal extends Component {
  constructor() {
    super()
    this.state = { modalIsOpen: false }
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    const customStyle = {
      overlay: { backgroundColor: "rgba(55, 55, 55, 0.75)" },
      content: {
        left: "150px",
        right: "150px"
      }
    }
    return (
      <div className="picture-form-wrapper">
        <button className="btn btn-default" onClick={() => this.openModal()}>
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          contentLabel="Submit picture"
          style={customStyle}
        >
          <ImageForm closeModal={() => this.closeModal()} />
        </Modal>
      </div>
    )
  }
}

export default FormModal
