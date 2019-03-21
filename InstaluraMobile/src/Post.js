import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  View,
  Image
} from 'react-native'
import _ from 'lodash'
import { withNavigation } from 'react-navigation'
import Header from './Header'
import Like from './Like'
import Comment from './Comment'

const {
  width
} = Dimensions.get('screen')

const styles = StyleSheet.create({
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
      updateCallback,
      navigation
    } = this.props

    if (comment) {
      foto.comentarios = [
        ...foto.comentarios,
        {
          id: comment,
          login: navigation.getParam('usuario'),
          texto: comment
        }
      ]
      foto.comment = comment
      updateCallback(foto, 'comment')
    }
  }

  handlerLikePost = () => {
    let {
      foto,
      updateCallback,
      navigation
    } = this.props

    const usuario = navigation.getParam('usuario')

    foto.likeada = !foto.likeada

    if (foto.likeada) {
      foto.likers = [
        ...foto.likers,
        { login: usuario }
      ]
    } else {
      foto.likers = _.filter(foto.likers, item => item.login !== usuario)
    }

    updateCallback(foto, 'like')
  }

  render() {
    const {
      foto,
      navigateToFriend
    } = this.props
    return (
      <View>
        <Header foto={foto} navigateToFriend={navigateToFriend} />
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
  updateCallback: PropTypes.func,
  navigation: PropTypes.object,
  navigateToFriend: PropTypes.func
}

export default withNavigation(Post)
