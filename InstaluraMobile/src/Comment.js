import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import _ from 'lodash'

import SendButton from '../assets/send.png'

const styles = StyleSheet.create({
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: 40
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  icone: {
    width: 30,
    height: 30
  }
})


class Comment extends Component {
  constructor(props) {
    super(props)
    this.inputComentario = React.createRef()
    this.inputComentarioText = ''
  }

  handlerAddComment = () => {
    const {
      addCallback
    } = this.props
    addCallback(this.inputComentarioText)
    this.inputComentario.current.clear()
  }

  handlerChangeText = (event) => {
    this.inputComentarioText = event
  }

  render() {
    const {
      foto
    } = this.props
    return (
      <Fragment>
        {
          _.map(foto.comentarios, (comentario, index) =>
            <View
              style={styles.comentario}
              key={index}
            >
              <Text
                style={styles.tituloComentario}
              >
                {comentario.login}
              </Text>
              <Text>{comentario.texto}</Text>
            </View>
          )
        }
        <View style = { styles.novoComentario }>
          <TextInput
            style={styles.input}
            placeholder="Adicione um comentário..."
            underlineColorAndroid="transparent"
            ref={this.inputComentario}
            onChangeText={this.handlerChangeText}
          />
          <TouchableOpacity
            onPress={this.handlerAddComment}
          >
            <Image
              style={styles.icone}
              source={SendButton}
            />
          </TouchableOpacity>
        </View>
      </Fragment>
    )
  }
}

Comment.propTypes = {
  foto: PropTypes.object,
  addCallback: PropTypes.func
}

export default Comment
