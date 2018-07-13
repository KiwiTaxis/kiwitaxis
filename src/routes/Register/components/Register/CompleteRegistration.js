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






const values = values =>{
    console.log(this.props.values)
}

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
			<View>
			<View style ={styles.container}>
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
			</View>
	
			);
	}
 
const loginbtn = values=>{

	console.log(values.email)
	
	request.post("http://54.252.173.49/api/passenger/register")
//fname
//lname
//password
//card
//email
//phone
//card
//
/*driving_license_number
	driving_license_version
	driving_license_expires
	driving_license_class
	vehicle_plate_number
	vehicle_brand
	vehicle_model
	vehicle_year*/


	.send({email:values.email,first_name:values.fname,last_name:values.lname,mobile:values.phone,card_no:values.card,password:values.password})
	.set('accept','json')
	.end((err,res)=>{
		console.log (res);
		
		var response = (JSON.parse((res.text)));
			Actions.home();
			const token = response.data.api_token;
			console.log(token);
			Keyboard.dismiss();
		})
	}
		
	
const CompleteRegistration = props =>

	{   
		const {handleSubmit} = props;
		return(
            <Form>
            <FieldsContainer>
              <Fieldset label="Contact details">
                <Input name="first_name" label="First name" placeholder="John" />
                <Input name="email" label="Email" placeholder="something@domain.com" />
              </Fieldset>
              <Fieldset label="Shipping details" last>
                <Input name="password" label="Address" placeholder="Hejrevej 33" />
                <Input name="password_repeat" label="City" placeholder="Copenhagen" />
                <Switch label="Save my details" border={false} name="save_details" />
              </Fieldset>
            </FieldsContainer>
            <ActionsContainer>
              <Button icon="md-checkmark" iconPlacement="right" onPress={handleSubmit(onSubmit)} submitting={submitting}>Save</Button>
            </ActionsContainer>
          </Form>
					
			
			);
	}


 const Registration =reduxForm({
	form:'completeform', //uniqueid 
	validate,

	})(CompleteRegistration);  
  
export default CompleteRegistration;