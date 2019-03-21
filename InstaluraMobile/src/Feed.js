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
  getFriendFeed,
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
    const {
      navigation
    } = this.props
    const friend = navigation.getParam('friend')
    if (friend) {
      this.getFriendFotos(friend)
    } else {
      this.getFotos()
    }
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

  handlerNavigateToFriend = (friend) => () => {
    const {
      navigation
    } = this.props
    navigation.navigate('FriendFeedScreen', { friend: friend })
  }

  getFotos = async () => {
    const feed = await getFeed()
    if (feed) {
      this.setState({
        fotos: feed
      })
    }
  }

  getFriendFotos = async (friend) => {
    const feed = await getFriendFeed(friend)
    if (feed) {
      this.setState({
        fotos: feed
      })
    }
  }

  renderItemHandler = ({ item }) => {
    return (
      <Post
        foto={item}
        updateCallback={this.handlerUpdateFoto}
        navigateToFriend={this.handlerNavigateToFriend}
      />
    )
  }

  render() {
    const {
      fotos
    } = this.state
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
