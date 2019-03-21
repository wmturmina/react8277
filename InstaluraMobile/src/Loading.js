/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  StatusBar,
  View,
  StyleSheet
} from 'react-native'

import { getToken } from '../services/API'


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

class Loading extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadToken()
  }
  loadToken = async () => {
    const {
      navigation
    } = this.props
    const token = await getToken()
    navigation.navigate(token ? 'App' : 'Auth')
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

Loading.propTypes = {
  navigation: PropTypes.object
}

export default Loading
