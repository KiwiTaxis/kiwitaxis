import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import {View, AsyncStorage } from 'react-native';

import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { NetInfo,Text } from "react-native";
import HomeContainer from '..//routes/Home/container/HomeContainer';

import Registration from '..//routes/Register/components/Register/Registration' ;
import Registrationn from '..//routes/Register/components/Register/Registrationn';
import Register from '..//routes/Register/container/RegisterContainer';
import SwitchScreen from '..//routes/Register/components/SwitchScreen/Switchscreen'
import {Action,Scene} from 'react-native-router-flux';
import InitialLoad from '../routes/InitialLoad/InitialLoad';
import CompleteRegistration from '../routes/Register/components/Register/CompleteRegistration';
import Navigation from '..//routes/Navigation/container/NavigationContainer';
import { ActionConst } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';	 
import NavigationDrawer from '../routes/NavigationDrawer/SideMenu';
import Ratingreview from '../routes/Rating/Rating';
import SideMenu from '../routes/NavigationDrawer/SideMenu';
import MyProfile from '../routes/MyProfile/MyProfile';
import MyTrips from '../routes/MyTrips/MyTrips'


export default class AppContainer extends Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	}
	constructor(){
		super()
		this.state={
			connected :false
		},
		this.state ={
			hastoken : ' ',
			//isloaded:false
		}
	}

	async componentDidMount(){
			try{
				 value = await AsyncStorage.getItem('token').then((values)=>{
					console.log(values);
					values = null;
					if(values != null){
						console.log(values);
						this.setState({hastoken:true})
						//Actions.home()
					}
					else{
						//this.setState({hastoken:false})
						console.log(this.state.hastoken)
						this.setState({hastoken:false})
						console.log(values);
					}

					
				})
				
					
				
			}catch(error){
				console.log(error);

			}
			



		
		}
		render(){
			let isloggedin = this.state.hastoken;
			console.log(isloggedin);
		//if(this.state.connected){
		/*return(<View> 
				<Text>
				 Connect To Internet first 
				 </Text>
			  </View>*
			)}//else{*/
		return (
		
	    	<Provider store={this.props.store}>
		
	       	<Router>
			<Scene key="root">
				<Scene key ="initialload" component ={InitialLoad} hideNavBar ="true"    />
				<Scene key ="switchscreen" component ={SwitchScreen} hideNavBar ="true"    />
				<Scene key ="login" component ={Register} hideNavBar ="true" />
				<Scene key ="register" component ={Registration}  title="REGISTRATION"   hideNavBar ="true" />
				<Scene key ="_complete_register" component ={Registrationn}  title="UPLOAD DOCUMENTS" />
			   <Scene key="drawer" type={ActionConst.RESET} drawer contentComponent ={SideMenu	} hideNavBar open={false}>
				<Scene key ="home" component ={HomeContainer}  hideNavBar ="true" title="HOME"     />
				<Scene key ="navigater" component ={Navigation}  hideNavBar ="true" title=" "     />
				<Scene key ="profile" component ={MyProfile}  title=" "	/>
				<Scene key ="trips" component ={MyTrips}   title=" " />
				<Scene key ="rating" component ={Ratingreview}  hideNavBar ="true" title=" "     />
				</Scene>
			
				</Scene>	
			</Router> 
		
			</Provider>
	
			);
		}
	}
//}
