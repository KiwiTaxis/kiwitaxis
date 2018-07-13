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
import { actions } from 'redux-form';





const validate = values =>{
	const error ={};
	console.log(values);
	var emailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email);
	var number	 = /^\d+$/.test(values.phone);
	
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
	if(!values.password && !values.cpassword )
	{
		error.password = "Please enter password"
	}
	if(!values.phone )
	{
		error.phone = "Please enter phone"
	}
	else if(!number){
		error.phone ="Please enter digits only"
	}
	
	return error;
 }

const fields= ({placeholder,textentry,meta:{error,touched},input:{onChange},loading}) =>
	{
		return(
			<View style={styles.textinputs}>
		
			<TextInput  style={styles.email} 
					placeholder ={placeholder}
					style = {styles.input} 
					secureTextEntry = {textentry}
					onChangeText ={onChange}	
					underlineColorAndroid="transparent"
					
					>
					
			</TextInput>
			{touched && (error && (<Text style = {{color:"#000080"}}>{error}</Text>))} 
					
		


			</View>
		
	
			);
	}
 
const loginbtn = values=>{

	console.log(values.email)

request.post("http://54.252.173.49/api/driver/register/basicSubmit")

	.send({
		first_name : values.fname,
		last_name	: values.lname,
		email : values.email,
		password:values.password,
		mobile : values.phone

	})
	.set('accept','json')
	
	.end((err,res)=>{
		console.log (res);
		//alert(res.text);
		
		var response = (JSON.parse((res.text)));
		console.log(response);
			if(response.errMsg == "Success")
			{

				try{
					AsyncStorage.setItem('driverid',response.data.driverRegistrationId);
					
				} catch(error){
					console.log(error);
				}
				
				alert("Your details have been saved please follow next step")
			
				Actions._complete_register();
			}
			else{
				alert("Something Went Wrong!")
			}
		})
	}
		
	
const RegistrationForm = props =>

	{   
		const {handleSubmit} = props;
		return(
	
	
			<KeyboardAvoidingView behavior="padding">
		
			<View style ={styles.socialbuttons}>
			<Button title ="Facebook" color = "#3B5998"/>
			<View style ={styles.google}>
			<Button title ="Google" color = "#dd4b39" />
			</View>
			</View>
			
			
				<View style = {styles.firstname}>
								<Field
								name="fname"
								component ={fields}
								placeholder = "FirstName"	
								textentry = {false}/>
									</View>
						<View style = {styles.firstname}>	
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
								textentry = {false} />
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
								name="cpassword"
								component ={fields}
								placeholder = "Confirm Password"
								textentry = {true} />
								</View>
								<View style = {styles.email} > 
								<Field
								name="phone"
								component ={fields}
								placeholder = "Phone"
								textentry = {false} />
								</View>
								<Button title ="Register" color="#000080" onPress={handleSubmit(loginbtn)}/>
								
							

				
					</KeyboardAvoidingView>
			
			);
	}


 const Registration =reduxForm({
	form:'registrationform', 
	validate,

	})(RegistrationForm);  
  
export default Registration;