import React, { Component } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"

// This component is the zoomable image in every "pin"
class PinModal extends Component {
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

  addPlaceholderSrc(event) {
    event.target.src = "/placeholder.png"
  }

  render() {
    const customStyle = {
      overlay: { backgroundColor: "rgba(55, 55, 55, 0.9)" },
      content: {
        padding: 0,
        position: "fixed",
        right: "auto",
        left: "50%",
        transform: "translate(-50%,0)",
        outline: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
        border: "none",
        borderRadius: 0
      }
    }
    const { pic } = this.props
    return (
      <div>
        <img
          onClick={() => this.openModal()}
          onError={this.addPlaceholderSrc}
          className="image"
          src={pic.link}
          alt={pic.description}
        />
        {this.state.modalIsOpen
        ? <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          contentLabel="Submit picture"
          style={customStyle}
        >
          <div className="modal-image-wrapper" onClick={() => this.closeModal()}>
            <img
              onClick={() => this.closeModal()}
              onError={this.addPlaceholderSrc}
              className="modal-image"
              src={pic.link}
              alt={pic.description}
            />
          </div>
        </Modal>
        : null}
      </div>
    )
  }
}

PinModal.propTypes = {
  pic: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    uploadedBy: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired
}

export default PinModal
