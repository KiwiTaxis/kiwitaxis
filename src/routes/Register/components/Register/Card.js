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
import styles from './RegistrationStyle';
import { reduxForm, Field} from 'redux-form';
import request from '../../../../util/request';
import {Actions} from 'react-native-router-flux'
//mport {Loader} from './Loader';
import { actions } from 'redux-form';


const validate = values =>{

	const error ={};
	console.log(values);
	var emailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email);
	 if(!values.fname)
	{
			 error.fname = "Please enter firstname"

		 //alert(values.email);
    }
	if(!values.lname)
	{
		error.lname = "Please enter lastname"
	}
	if(!values.email)
	{
		error.email = "Please enter email"
	}else if(!emailtest){
		error.email = "Invalid email"

	}

	if(!values.phone)
	{
		error.phone = "Please enter phone"
	}
	return error;
 }

const fields= ({placeholder,textentry,meta:{error,touched},input:{onChange},loading}) =>
	{
		return(
			<View>
			<View style ={styles.container}>
			<TextInput  style={styles.email} 
					placeholder ={placeholder}
					style = {styles.input} 
					securesecureTextEntry = {textentry}
					onChangeText ={onChange}	
					underlineColorAndroid="transparent"
					>
					<Text> { this.props.value } </Text>
			</TextInput>
			{touched && (error && (<Text style = {{color:"red"}}>{error}</Text>))} 
			</View>
			</View>
	
			);
	}
 
const loginbtn = values=>{
    request.post("http://54.252.173.49/api/passenger/register")
	.send({email:values.email,first_name:values.password})
	.set('accept','json')
	.end((err,res)=>{
		console.log (JSON.parse((res.text)));
		
		var response = (JSON.parse((res.text)));
		if(response.errMsg == "Success")
		{	try{
			AsyncStorage.setItem('token',response.data.api_token);
		} catch(error){
			console.log(error);

		}

		try{
			AsyncStorage.getItem('token').then((token)=>{
				console.log(token);
			})
			
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
const RegistrationForm = props =>
	{   
		const {handleSubmit} = props;
		return(
	
			<View>
			<View>
				<View style = {styles.firstname}>
								<Field
								name="fname"
								component ={fields}
								placeholder = "FirstName"	
								textentry = {false}/>
				</View>
				<View style = {styles.lastname}>
								<Field
								name="lname"
								component ={fields}
								placeholder = "Lastname"
								textentry = {false} />
				</View>
				<View style = {styles.email}>
								<Field 
								name="email"
								component ={fields}
								placeholder = "example@example.com"
								textentry = {true} />
				</View>
				<View style = {styles.email} >
								<Field
								name="password"
								component ={fields}
					    		placeholder = "Password"
				    			textentry = {true} />
				</View>
				<View style = {styles.email} > 
								<Field
								name="password"
								component ={fields}
								placeholder = "Confirm Password"
			    				textentry = {true} />
				</View>
				<View>
				    <Text> +64- </Text>
				</View>
								
				<View style = {styles.emailphone} > 
								<Field
								name="card"
								component ={fields}
								placeholder = "Phone"
								textentry = {true} />
				</View>
				<KeyboardAvoidingView behavior="padding" >
								<Button title ="Next" onPress={handleSubmit(loginbtn)}/>
				</KeyboardAvoidingView>
					</View>
			</View>
			);
	}


 const Registration =reduxForm({
	form:'registrationform', //uniqueid 
	validate,

	})(RegistrationForm);  
  
export default Registration;