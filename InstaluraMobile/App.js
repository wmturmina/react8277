import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import Login from './src/Login'
import Feed from './src/Feed'

const AppNavigator = createStackNavigator({
  LoginScreen: {
    screen: Login
  },
  FeedScreen: {
    screen: Feed
  }
},
{
  headerMode: 'None'
})

export default createAppContainer(AppNavigator)
