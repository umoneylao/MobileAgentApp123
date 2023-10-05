/**
 * @format
 */
 
 import React, { Component } from 'react'
 import { AppRegistry } from 'react-native'
 import {name as ewallet} from './app.json';
 import App from './App'
 import { Splash } from './src/components'
 class Main extends Component{
     constructor(props) {
         super(props);
         this.state = { currentScreen: 'Splash' };
         setTimeout(()=>{
             this.setState({ currentScreen: 'App' })
         }, 2000)
     }
     render() {
         const { currentScreen } = this.state
         let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />
         return mainScreen
     }
 }
 AppRegistry.registerComponent(ewallet, () => Main)
 
 
 