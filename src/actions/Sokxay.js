import { UPLOAD_IMAGE, UPLOAD_IMAGE_REQUEST, GET_PAYMENT_INFO_SOKXAY, SEARCH_UPLOAD_IMAGE, STORE_IMAGE } from '../actions/types'

export const onPassValueRequest = (data) => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
    data
  }
}

export const uploadDataImage = (data) => {
  return {
    type: UPLOAD_IMAGE,
    payload: { data }
  }
}

export const onStoreToServer = (data) => {
  return {
    type: STORE_IMAGE,
    payload: { data }
  }
}

export const onGetPaymentInfo = (data) => {
  return {
    type: GET_PAYMENT_INFO_SOKXAY,
    data
  }
}

export const searchUploadImage = (data) => {
  return {
    type: SEARCH_UPLOAD_IMAGE,
    data
  }
}