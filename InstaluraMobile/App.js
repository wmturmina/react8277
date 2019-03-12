import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contador: 0
    }
  }

  onPressMyButton = (event) => {
    this.setState({
      contador: ++this.state.contador
    })
  }

  render() {
    const {
      contador
    } = this.state
    return (
      <View style={styles.container}>
        <Text>{contador}</Text>
        <Button title="Add +" onPress={this.onPressMyButton} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
