import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Gallery from "./Gallery"
import FormModal from "./FormModal"

function Home({ pictures, user }) {
  return (
    <div>
      <div>
        <h1>
          All images
          {user ? <FormModal /> : null}
        </h1>
      </div>
      <hr />
      <Gallery pictures={pictures.data} />
    </div>
  )
}

Home.propTypes = {
  pictures: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  user: PropTypes.string
}
Home.defaultProps = { user: null }

const mapStateToProps = (state) => {
  return { pictures: state.pictures, user: state.user }
}

export default connect(mapStateToProps)(Home)
