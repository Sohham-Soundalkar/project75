import * as React from 'react';
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import ReadStoryscreen from './screens/readstoryscreen';
import WriteStoryscreen from './screens/writestoryscreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginScreen from './screens/loginscreen';

export default function App(){
  return(
    <AppContainer/>
  )
}

const TabNavigator = createBottomTabNavigator({
  WriteStory: {screen:WriteStoryscreen},
  ReadStory: {screen:ReadStoryscreen}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName
      if(routeName==='WriteStory'){
        return(
           <Image
           source={require('./assets/write.png')}
           style={{width:40, height: 40}}
           />
        )
      }
      else if(routeName==='ReadStory'){
        return(
          <Image
          source={require('./assets/read.png')}
          style={{width:40, height: 40}}
          />
       )
      }
    }
  })
})

const switchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen},
  TabNavigator: {screen: TabNavigator}
})

const AppContainer = createAppContainer(switchNavigator)