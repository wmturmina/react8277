import React from 'react'
import axios from 'axios'
import {
  FlatList
} from 'react-native'
import Post from './src/Post'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    this.getFotos()
  }

  getFotos = () => {
    return axios.get('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then((result) => {
        this.setState({
          fotos: result.data
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  renderItemHandler = ({ item }) => {
    return (
      <Post foto={item} />
    )
  }

  render() {
    const {
      fotos
    } = this.state
    return (
      <FlatList
        data={fotos}
        renderItem={this.renderItemHandler}
        keyExtractor={item => String(item.id)}
      />
    )
  }
}

export default App
