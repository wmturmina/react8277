/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import _ from 'lodash'

const host = 'https://instalura-api.herokuapp.com/api/'

const getToken = async () => {
  const tokenToBeReturned = await AsyncStorage.getItem('token')
  return tokenToBeReturned
}
const defaultErrorCallback = () => {
  alert('Unknow error')
}
export const getFeed = async (errorCallBack = defaultErrorCallback) => {
  const returnFeed = await axios.get(`${host}/fotos`, {
    headers: {
      'X-AUTH-TOKEN': await getToken()
    }
  })
  const {
    status,
    data
  } = await returnFeed
  if (status !== 200) {
    errorCallBack()
    return []
  }

  return _.orderBy(data, 'id')
}

export const doLogin = async (user, password, errorCallBack = defaultErrorCallback) => {
  const returnToken = await axios.post(`${host}/public/login`, {
    login: user,
    senha: password
  })
  const {
    status,
    data
  } = await returnToken
  if (status !== 200) {
    errorCallBack()
    return false
  }
  AsyncStorage.setItem('token', data)
  return true
}

export const doLike = async (id, errorCallBack = defaultErrorCallback) => {
  const returnLike = await axios.post(`${host}/fotos/${id}/like`, null, {
    headers: {
      'X-AUTH-TOKEN': await getToken()
    }
  })
  const {
    status
  } = await returnLike
  if (status !== 200) {
    errorCallBack()
    return false
  }
  return true
}

export const doAddComment = async (id, comment, errorCallBack = defaultErrorCallback) => {
  const returnAddComment = await axios.post(`https://instalura-api.herokuapp.com/api/fotos/${id}/comment`, {
    texto: comment
  },
  {
    headers: {
      'X-AUTH-TOKEN': await getToken()
    }
  })
  const {
    status
  } = await returnAddComment
  if (status !== 200) {
    errorCallBack()
    return false
  }
  return true
}
