import axios from "axios"

export function readCookie(cookie) {
  return { type: "READ_COOKIE", userId: cookie }
}

export function requestPictures() {
  return { type: "REQUEST_PICTURES" }
}

export function receivePictures(data) {
  return { type: "RECEIVE_PICTURES", data, receivedAt: Date.now() }
}

export function removePicture(id) {
  return { type: "REMOVE_PICTURE", id }
}

export function likePicture(pictureId, userId) {
  return { type: "LIKE_PICTURE", pictureId, userId }
}

export function postPicture(params) {
  return (dispatch) => {
    dispatch(requestPictures())
    return axios.post("/api/picture", params)
      .then(result => dispatch(receivePictures(result.data)))
  }
}

export function getPictures() {
  return (dispatch) => {
    dispatch(requestPictures())
    return axios.get("/api/pictures")
      .then(result => dispatch(receivePictures(result.data)))
  }
}

export function deletePicture(id) {
  return (dispatch) => {
    dispatch(removePicture(id))
    return axios.delete("/api/picture", { params: { id } })
  }
}

export function putLike(pictureId, userId) {
  return (dispatch) => {
    dispatch(likePicture(pictureId, userId))
    return axios.put("/api/like", { pictureId })
  }
}
