/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';


 
export default class FirstScreen extends Component {
	
	 
  render() {
  return (
       <View style = {styles.container}>
			<View style ={styles.logocontainer}>
					<Image source={require('./logo.png')}   initWidth="300" initHeight="300"/>
			</View>
			
			<View style = {styles.regiform}>
			<TextInput  style={styles.email} 
					placeholder ="Email or Phone" 
					style = {styles.input} 
					underlineColorAndroid='rgba(0,0,0,0)'>
				</TextInput>
					<TextInput style={styles.input} placeholder ="Password" underlineColorAndroid='rgba(0,0,0,0)'> 
					</TextInput>
				<TouchableOpacity style={styles.buttoncontainer}>
						<Text style={styles.buttontext} onPress={() => this.props.navigation.navigate('Home')}>  Login </Text>
				</TouchableOpacity>
	    
			 </View>
	  </View>   );
  }
}

const styles = StyleSheet.create({
container:{
	flex:1,
	justifyContent : 'center',
	alignItems : 'center',
	height:200,
	backgroundColor: '#000080',
	},
logocontainer:{
flexGrow: 1,
	justifyContent : 'center',
	alignItems : 'center',
	
	
	
},
regiform:{
flexGrow: 1,
alignItems:'center',
justifyContent :'center',
},

buttoncontainer:{

paddingVertical :5,
borderRadius:20,
backgroundColor:'rgba(224,255,255,0.6)',
width:250, 

},
buttontext:{
	textAlign:'center',
	color :'#000080',
	fontSize:16,
},
heading:{
	fontSize : 24,
	color :'#fff',
	paddingBottom :10,
	marginBottom :40,
	borderBottomColor: '#fff',
	borderBottomWidth: 0.5,
},
input:{
	fontSize : 14,
	backgroundColor:'rgba(224,255,255,0.5)',
	paddingBottom :10,
	marginBottom :30,
	borderRadius: 25,
	width:300,
	height:50,
	textAlign:'center',
	color:'#fff',
},
pass:{
	fontSize : 14,
	backgroundColor:'rgba(255,255,255,0.5)',
},
});
module.exports = FirstScreen;