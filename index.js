
import App from './App';


import React,{Component} from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View
} from 'react-native';



//import FirstScreen from './src/components/firstscreen.js';
//import HomeScreen from './src/components/HomeScreen.js';
//import SwicthScreen from './src/components/SwitchScreen.js';
//import ConnectionInfo from './src/components/ConnectionInfo.js';
//import AppHeader from '.src/src/components/appheader.js'
//import { NativeModules } from 'react-native';
//import { StackNavigator } from 'react-navigation';
//import { MenuProvider } from 'react-native-popup-menu';
import Root from './src/main';

export default class Index extends Component{
render(){
//const {navigate} = this.props.navigation;
return(	
	<View style ={styles.regcontainer}>
	<Root {...this.props}/>
	</View>
	);
	}

	
	}
const styles = StyleSheet.create({
regcontainer:{
flex :1,
backgroundColor: '#fff',
}
})
/*
const navigation = StackNavigator(
{		
		//Connection:{screen:ConnectionInfo},
		Switch:{screen : SwicthScreen},
		Login :{screen : FirstScreen},
		Home:{screen : HomeScreen},
},

		{
			headerMode: 'none',
			mode: 'card',

		},
	
); 
*/

AppRegistry.registerComponent('KiwiTaxisPartners', () => Index);