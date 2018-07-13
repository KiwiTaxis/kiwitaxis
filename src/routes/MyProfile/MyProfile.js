import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import {View,Text, AsyncStorage } from 'react-native';
import request from '../../util/request';
import  Icon  from 'react-native-vector-icons/FontAwesome'

 class MyProfile extends Component {
	 constructor(){
	 super();
	 this.state = ({
		 profile:{
			 fname: " ",
			 lname : " ",
			 email : " ",
			 phone : " "

		 }
	 })
	}
	async componentDidMount() {
       const value = AsyncStorage.getItem('token').then((value)=>{
		   Promise.resolve(value).then((token)=>{
		request.post('http://54.252.173.49/api/passenger/getProfile')
		.send({
			api_token:value
		}).finish((error,res)=>{
		
			var response = JSON.parse(res.text);
		 	this.setState({
			profile: {
				fname : response.data.first_name,
				lname : response.data.last_name,
				email : response.data.email,
				phone : response.data.mobile
			}
		})
	
	   })
	})


		})
	}
		render(){
			return (
			<View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
			<Icon size={100} name ="user" />
            <Text> {this.state.profile.fname} </Text>
			<Text> {this.state.profile.lname} </Text>
			<Text> {this.state.profile.email} </Text>
			<Text> {this.state.profile.phone} </Text>
		    </View>
	    	);
		}
	}
	export default MyProfile;

