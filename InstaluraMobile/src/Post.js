import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  View,
  Image
} from 'react-native'
import _ from 'lodash'
import Header from './Header'
import Like from './Like'
import Comment from './Comment'

const {
  width
} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  foto: {
    width: width,
    height: width
  }
})

class Post extends Component {
  constructor(props) {
    super(props)
  }

  handlerAddComment = (comment) => {
    let {
      foto,
      updateCallback
    } = this.props

    if (comment) {
      foto.comentarios = [
        ...foto.comentarios,
        {
          id: comment,
          login: 'eu',
          texto: comment
        }
      ]
      updateCallback(foto)
    }
  }

  handlerLikePost = () => {
    let {
      foto,
      updateCallback
    } = this.props

    foto.likeada = !foto.likeada

    if (foto.likeada) {
      foto.likers = [
        ...foto.likers,
        { login: 'eu' }
      ]
    } else {
      foto.likers = _.filter(foto.likers, item => item.login !== 'eu')
    }

    updateCallback(foto)
  }

  render() {
    const {
      foto
    } = this.props
    return (
      <View style={styles.container}>
        <Header foto={foto} />
        <Image
          source={{
            uri: foto.urlFoto
          }}
          style={styles.foto}
        />
        <Like foto={foto} likeCallback={this.handlerLikePost} />
        <Comment foto={foto} addCallback={this.handlerAddComment} />
      </View>
    )
  }
}

Post.propTypes = {
  foto: PropTypes.object,
  updateCallback: PropTypes.func
}

export default Post
