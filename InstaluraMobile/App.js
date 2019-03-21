import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import Login from './src/Login'
import Loading from './src/Loading'
import Feed from './src/Feed'

const InstaluraStack = createStackNavigator({
  FeedScreen: {
    screen: Feed
  },
  FriendFeedScreen: {
    screen: Feed
  }
},
{
  headerMode: 'None'
})
const LoginStack = createStackNavigator({
  LoginScreen: {
    screen: Login
  }
},
{
  headerMode: 'None'
})

const AppNavigator = createSwitchNavigator({
  LoadingScreen: {
    screen: Loading
  },
  Auth: LoginStack,
  App: InstaluraStack
},
{
  headerMode: 'None',
  initialRouteName: 'LoadingScreen'
})

export default createAppContainer(AppNavigator)
