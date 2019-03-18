import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
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

const Header = ({ foto }) => (
  <View style={styles.cabecalho}>
    <Image
      source={{
        uri: foto.urlPerfil
      }}
      style={styles.fotoDePerfil}
    />
    <Text>{foto.loginUsuario}</Text>
  </View>
)

Header.propTypes = {
  foto: PropTypes.object
}
export default Header
