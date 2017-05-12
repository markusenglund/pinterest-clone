import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import FormModal from "./FormModal"
import Gallery from "./Gallery"

// This component is used both for "my images" and other user's images
function User({ match, pictures, user }) {
  const relevantPictures = pictures.data.filter(pic => pic.uploadedBy._id === match.params.id)

  let heading
  if (match.params.id === user) {
    heading = "My images"
  } else if (relevantPictures.length === 0) {
    heading = "There doesn't seem to be anything here..."
  } else {
    heading = `${relevantPictures[0].uploadedBy.displayName}'s images`
  }

  return (
    <div>
      <h1>
        {heading}
        {match.params.id === user ? <FormModal /> : null}
      </h1>
      <hr />
      <Gallery pictures={relevantPictures} />
    </div>
  )
}

User.propTypes = {
  pictures: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  user: PropTypes.string
}
User.defaultProps = { user: null }

function mapStateToProps(state) {
  return {
    pictures: state.pictures,
    user: state.user
  }
}

export default connect(mapStateToProps)(User)
