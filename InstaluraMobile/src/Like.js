import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import S2Checked from '../assets/s2-checked.png'
import S2 from '../assets/s2.png'

const styles = StyleSheet.create({
  botaoDeLike: {
    marginBottom: 10,
    height: 40,
    width: 40
  },
  likes: {
    fontWeight: 'bold'
  }
})


class Like extends Component {
  constructor(props) {
    super(props)
  }

  showLikes = (likers) => {
    if (likers.length <= 0) {
      return null
    }
    return (
      <Text style={styles.likes}>
        {likers.length} {`curtida${likers.length > 1 ? 's' : ''}`}
      </Text>
    )
  }

  render() {
    const {
      foto,
      likeCallback
    } = this.props
    return (
      <View>
        <TouchableOpacity onPress={likeCallback}>
          <Image
            style={styles.botaoDeLike}
            source={
              foto.likeada
                ? S2Checked
                : S2
            }
          />
        </TouchableOpacity>
        {this.showLikes(foto.likers)}
      </View>
    )
  }
}

Like.propTypes = {
  foto: PropTypes.object,
  likeCallback: PropTypes.func
}

export default Like
