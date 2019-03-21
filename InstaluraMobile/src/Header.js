import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'

const styles = StyleSheet.create({
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
  }
})

const Header = ({ foto, navigateToFriend }) => (
  <TouchableOpacity style={styles.cabecalho} onPress={navigateToFriend(foto.loginUsuario)}>
    <Image
      source={{
        uri: foto.urlPerfil
      }}
      style={styles.fotoDePerfil}
    />
    <Text>{foto.loginUsuario}</Text>
  </TouchableOpacity>
)

Header.propTypes = {
  foto: PropTypes.object,
  navigateToFriend: PropTypes.func
}
export default Header
