import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  StyleSheet,
  Platform
} from 'react-native'
import _ from 'lodash'
import Post from './Post'
import {
  getFeed,
  doLike,
  doAddComment
} from '../services/API'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    marginBottom: Platform.OS === 'ios' ? 30 : 0
  }
})

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fotos: []
    }
    this.token = ''
  }

  componentDidMount() {
    this.getFotos()
  }

  handlerUpdateFoto = async (foto, action) => {
    let {
      fotos
    } = this.state
    const comment = foto.comment
    fotos = _.filter(fotos, item => item.id !== foto.id)
    fotos = [
      ...fotos,
      _.omit(foto, 'comment')
    ]
    this.setState({
      fotos: _.orderBy(fotos, 'id')
    })
    if (action === 'like') {
      await doLike(foto.id)
    }
    if (action === 'comment') {
      await doAddComment(foto.id, comment)
    }
  }

  getFotos = async () => {
    const feed = await getFeed()
    if (feed) {
      this.setState({
        fotos: feed
      })
    }
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
    console.warn('Fotos', fotos.length, fotos)
    return (
      <Fragment>
        {
          fotos.length !== 0 &&
          <FlatList
            data={fotos}
            renderItem={this.renderItemHandler}
            keyExtractor={item => String(item.id)}
            style={styles.container}
          />
        }
      </Fragment>
    )
  }
}

Feed.propTypes = {
  navigation: PropTypes.object
}

export default Feed
