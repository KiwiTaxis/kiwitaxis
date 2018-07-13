import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import {View,Text, AsyncStorage } from 'react-native';
import request from '../../util/request';
import  Icon  from 'react-native-vector-icons/FontAwesome'
import{ListItem,List,Body} from 'native-base';
 class MyTrips extends Component {
	 constructor(){
	 super();
	 this.state = ({
		 trip:{
		 }
	 })
	}
	async componentDidMount() {
       const value = AsyncStorage.getItem('token').then((value)=>{
		  console.log(value);
		   Promise.resolve(value).then((token)=>{
		request.post('http://54.252.173.49/api/driver/getTrip')
		.send({
			api_token:value
		}).finish((error,res)=>{
            
            var response = JSON.parse(res.text);
            console.log(response);
            if(response.errMsg == "Success")
            {
		 	this.setState({
			trip:response.data.trips
		})
	}
	   })
	})


		})
	}
		render(){
			return (
			<View>
                	<List 
					dataArray={this.state.trip}
					renderRow={(item)=>
						<View>
							<ListItem button avatar>
								
								<Body>
									<Text>{item.departure_}</Text>
									<Text >{item.destination_}</Text>
                                    <Text >{item.total_price_}</Text>
								</Body>
							</ListItem>
						</View>
					}
				/>	

            </View>
	    	);
		}
	}
	export default MyTrips;

