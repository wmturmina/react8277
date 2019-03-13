import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

const {
  width
} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
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

  render() {
    const {
      foto: { loginUsuario: usuario },
      foto: { urlPerfil: urlFotoPerfil },
      foto: { urlFoto: urlFoto }
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Image
            source={{
              uri: urlFotoPerfil
            }}
            style={styles.fotoDePerfil}
          />
          <Text>{usuario}</Text>
        </View>
        <Image
          source={{
            uri: urlFoto
          }}
          style={styles.foto}
        />
      </View>
    )
  }
}

Post.propTypes = {
  foto: PropTypes.object
}

export default Post
