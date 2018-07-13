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
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './LoginStyle';
import { reduxForm, Field} from 'redux-form';
import request from '../../../../util/request';
import {Actions} from 'react-native-router-flux'
import {Loader} from './Loader';
import { actions } from 'redux-form';



const validate = values =>{
	const error ={};
	console.log(values);
	var emailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email);
	 if(!values.email)
	{
			 error.email = "Please enter email"

		 //alert(values.email);

	}
	
	 else if(!emailtest){
		error.email = "Invalid Email"
	
	 }
	 if(!values.password)
	{
		error.password = "Please enter password"
	}
	return error;
 }

const fields= ({placeholder,textentry,meta:{error,touched},input:{onChange},loading}) =>
	{
		return(
			<View>
			<TextInput  style={styles.email} 
					placeholder ={placeholder}
					style = {styles.input} 
					secureTextEntry = {textentry}
					onChangeText ={onChange}
					underlineColorAndroid = "transparent"
					>
					
			</TextInput>
		
			{touched && (error && (<Text style = {{color:"red"}}>{error}</Text>))} 
		


			</View>
	
			);
	}
 
const loginbtn = values=>{

	console.log(values.email)
	
	request.post("http://54.252.173.49/api/driver/login")
	.send({email:values.email,password:values.password})
	.set('accept','json')
	.end((err,res)=>{
		console.log (res);

		var response = (JSON.parse((res.text)));
		if(response.errMsg == "Success")
		{	try{
			AsyncStorage.setItem('token',response.data.api_token);
			AsyncStorage.setItem('user_id',response.data.user_id);
		} catch(error){
			console.log(error);
		}

		try{
			const value = AsyncStorage.getItem('token');
			const id =  AsyncStorage.getItem('user_id');
			console.log(id);
		} catch(error){
			console.log(error);

		}
		
			Actions.home();
			const token = response.data.api_token;
			console.log(token);
			Keyboard.dismiss();
		}
		else{
			alert("Invalid Credentials");

		}

		});
	
	}
const LoginForm = props =>

	{   
		const {handleSubmit} = props;
		return(
			
		
			<View style ={styles.container} >
					
					<View style ={styles.logocontainer} >
							<Image source={require('./logonew.png')} />
					</View>
					
					<View style = {styles.regiform}>
					
								<Field
								name="email"
								component ={fields}
								placeholder = "Email"	
								textentry = {false}/>
								<Field
								name="password"
								component ={fields}
								placeholder = "Password"
								textentry = {true} />
						<TouchableOpacity style={styles.buttoncontainer} onPress ={handleSubmit(loginbtn)}>
							<Text style={styles.buttontext}>  Login </Text>
						</TouchableOpacity>
					</View>
			</View>
			
			);
	}


 const Login =reduxForm({
	form:'loginform', //uniqueid 
	validate,

	})(LoginForm);  
  
export default Login;