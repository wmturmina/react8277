import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native'
import axios from 'axios'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  botao: {
    backgroundColor: '#cccccc',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 5
  }
})

class Login extends Component {
  constructor(props) {
    super(props)
    this.inputUsuario = React.createRef()
    this.inputUsuarioText = ''
    this.inputPassword = React.createRef()
    this.inputPasswordText = ''
  }

  handlerChangeText = (target) => (event) => {
    this[target] = event
  }

  handlerLogin = () => {
    const { navigation } = this.props
    axios.post('https://instalura-api.herokuapp.com/api/public/login', {
      login: this.inputUsuarioText,
      senha: this.inputPasswordText
    })
      .then((result) => {
        AsyncStorage.setItem('token', result.data)
        AsyncStorage.setItem('usuario', this.inputUsuarioText)
        navigation.navigate('FeedScreen', { usuario: this.inputUsuarioText })
      })
      .catch((error) => {
        console.warn('Error', error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Instalura</Text>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="Usuário"
            keyboardType="email-address"
            ref={this.inputUsuario}
            onChangeText={this.handlerChangeText('inputUsuarioText')}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Senha"
            secureTextEntry={true}
            ref={this.inputPassword}
            onChangeText={this.handlerChangeText('inputPasswordText')}
          />
        </View>
        <View>
          <TouchableOpacity onPress={this.handlerLogin}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Login.propTypes = {
  navigation: PropTypes.object
}

export default Login
