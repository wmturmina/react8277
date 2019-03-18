import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  View,
  Image
} from 'react-native'
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
    this.state = {
      foto: props.foto
    }
  }

  render() {
    const {
      foto
    } = this.state
    return (
      <View style={styles.container}>
        <Header foto={foto} />
        <Image
          source={{
            uri: foto.urlFoto
          }}
          style={styles.foto}
        />
        <Like foto={foto} likeCallback={() => null} />
        <Comment foto={foto} />
      </View>
    )
  }
}

Post.propTypes = {
  foto: PropTypes.object
}

export default Post
