const pictures = (state = { data: [], isFetching: false }, action) => {
  switch (action.type) {
    // Immediately removes picture from state without querying db
    case "REMOVE_PICTURE": {
      const filteredData = state.data.filter(pic => pic._id !== action.id)
      return { ...state, data: filteredData }
    }

    // Immediately adds/subtracts a like without querying db
    case "LIKE_PICTURE": {
      const mappedData = state.data.map((pic) => {
        if (pic._id === action.pictureId) {
          if (pic.likedBy.includes(action.userId)) {
            return { ...pic, likedBy: pic.likedBy.filter(id => id !== action.userId) }
          }
          return { ...pic, likedBy: pic.likedBy.concat(action.userId) }
        }
        return pic
      })
      return { ...state, data: mappedData }
    }

    case "REQUEST_PICTURES":
      return { ...state, isFetching: true }

    // Receive all pictures from db-query and push them to state
    case "RECEIVE_PICTURES":
      return {
        isFetching: false,
        lastUpdated: action.receivedAt,
        data: action.data
      }

    default:
      return state
  }
}

export default pictures
