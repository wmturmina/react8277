import React from 'react'
import axios from 'axios'
import {
  FlatList
} from 'react-native'
import _ from 'lodash'
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

  handlerUpdateFoto = (foto) => {
    let {
      fotos
    } = this.state
    fotos = _.filter(fotos, item => item.id !== foto.id)
    fotos = [
      ...fotos,
      foto
    ]
    this.setState({
      fotos: _.orderBy(fotos, 'id')
    })
  }

  getFotos = () => {
    return axios.get('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then((result) => {
        this.setState({
          fotos: _.orderBy(result.data, 'id')
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  renderItemHandler = ({ item }) => {
    return (
      <Post foto={item} updateCallback={this.handlerUpdateFoto} />
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
