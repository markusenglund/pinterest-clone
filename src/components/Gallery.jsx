import React from "react"
import PropTypes from "prop-types"
import Masonry from "react-masonry-component"
import Pin from "./Pin"

function Gallery({ pictures }) {
  const masonryOptions = { isFitWidth: true }
  return (
    <div className="gallery-wrapper">
      <Masonry
        className="gallery"
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        options={masonryOptions}
      >
        {pictures.map(pic => <Pin key={pic._id} pic={pic} />)}
      </Masonry>
    </div>
  )
}

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Gallery
