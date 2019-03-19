import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  FlatList,
  StyleSheet,
  Platform
} from 'react-native'
import _ from 'lodash'
import Post from './Post'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 0
  }
})

class Feed extends React.Component {
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
    const {
      navigation
    } = this.props
    return (
      <Post
        foto={item}
        updateCallback={this.handlerUpdateFoto}
        navigation={navigation}
      />
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
        style={styles.container}
      />
    )
  }
}

Feed.propTypes = {
  navigation: PropTypes.object
}

export default Feed
