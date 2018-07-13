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
  TextInput,ScrollView,
  TouchableOpacity,
  View,
  Image,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  AsyncStorage,
  DatePickerAndroid

} from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './RegistrationStyle';
import { reduxForm, Field} from 'redux-form';
import request from '../../../../util/request';
import {Actions} from 'react-native-router-flux'
//mport {Loader} from './Loader';
import { actions } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker'



const validate = values =>{
	const error ={};
	console.log(values);
	var emailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email);
	var number	 = /^\d+$/.test(values.phone);
	
	 if(!values.driving_license_number)
	{
			 error.licensenumber = "Please enter licensenumber"
	}
	if(!values.driving_license_version)
	{
		error.driving_license_version = "Please enter version"
	}
	if(!values.expiredate)
	{
		error.expiredate = "Please enter expiredate"
	}
	if(!values.class)
	{
		error.class = "Please enter class of your driving licence"
	}
	if(!values.vehicle_plate_number)
	{
		error.class = "Please enter class of your vehicle licence plate"
	}
	if(!values.vehicle_brand)
	{
		error.class = "Please enter Car Make"
	}
	if(!values.vehicle_model)
	{
		error.class = "Please enter Vehicle Model"
	}
	if(!values.vehicle_year)
	{
		error.class = "Please enter Vehicle Year"
	}
	
return error;
 }

const fields= ({placeholder,textentry,loading,meta:{error,touched},input:{onChange}}) =>
	{
		return(
			<View style={styles.textinputs}>
		
			<TextInput  style={styles.email} 
					placeholder ={placeholder}
					style = {styles.input} 
					secureTextEntry = {textentry}
					onChangeText ={onChange}	
					
					>
					
			</TextInput>

		
			{touched && (error && (<Text style = {{color:"#000080"}}>{error}</Text>))} 		
			</View>
			
	
			);
	}
	const rednerdatepicker= ({ input: { onChange, value, ...restInput }, meta: { touched, error }, ...custom }) =>
	{
		return(
		<View>
		
			<DatePicker
        style={{ width: 300 }}
        date={value}
        mode='date'
        placeholder="Select Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 20,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 56
          }
        }}
        onDateChange={onChange}
      />
	  </View>
			);
	}


	

const loginbtn = (values,props)=>{
console.log(values);

	let value = AsyncStorage.getItem('driverid')
	console.log(value);
	Promise.resolve(value).then(function(valuess) {
	request.post("http://54.252.173.49/api/driver/register/moreDriverInfoSubmit")

	.send({
			driving_license_number : values.driving_license_number,
            driving_license_version :  values.driving_license_version,
            driving_license_expires: values.date,
            driving_license_class : values.class,
            driver_registration_id : valuess,
			vehicle_plate_number : values.vehicle_plate_number,
            vehicle_brand : values.vehicle_brand,
            vehicle_model : values.vehicle_model,
            vehicle_year  : values.vehicle_year
          

	})
	.set('accept','json')
	
	.end((err,res)=>{
		console.log (res);
		//alert(res.text);
		
		var response = (JSON.parse((res.text)));
			if(response.errMsg == "success")
			{
				AsyncStorage.removeItem('driverid')
				Actions.login();
			}
		})
	
})
}
		
	
const RegistrationFormII = props =>

	{   

		const {handleSubmit} = props;
		return(
	
		
			<KeyboardAvoidingView behavior="padding">
			
				<View style = {styles.firstname}>
								<Field
								name="driving_license_number"
								component ={fields}
								placeholder = "Driving Licence Number"	
								textentry = {false}/>
								</View>
						<View style = {styles.firstname}>	
								<Field
								name="driving_license_version"
								component ={fields}
								placeholder = "Driving Licence Version"
								textentry = {false} />
				</View>
								
				<View style = {styles.email}>
								<Field 
								name="class"
								component ={fields}
								placeholder = "Driving Licence Class"
								textentry = {false} />
				</View>
				<View style = {styles.email} >
				<Field name="date" label="ExpiryDate" component={rednerdatepicker} />
								</View>
				
								<View style = {styles.email} >
								<Field
								name="vehicle_plate_number"
								component ={fields}
								placeholder = "Vehicle Licence Plate"
								textentry = {false} />
								</View>
								<View style = {styles.email} >
								<Field
								name="vehicle_brand"
								component ={fields}
								placeholder = "Vehicle Make"
								textentry = {false} />
								</View>
								<View style = {styles.email} >
								<Field
								name="vehicle_model"
								component ={fields}
								placeholder = "Vehicle Make"
								textentry = {false} />
								</View>
								<View style = {styles.email} >
								<Field
								name="vehicle_year"
								component ={fields}
								placeholder = "Vehicle Make Year"
								textentry = {false} />
								</View>

								<Button title ="Submit" color="#000080" onPress={handleSubmit(loginbtn)}/>
					</KeyboardAvoidingView>
				
			
			);
	}


 const Registrationn =reduxForm({
	form:'RegistrationFormII', //uniqueid 
	validate,

	})(RegistrationFormII);  
  
export default Registrationn;