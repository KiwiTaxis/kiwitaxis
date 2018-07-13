import React,{Component} from 'react';
import { Text,View, AsyncStorage } from 'react-native';
import Mapview from 'react-native-maps';
import MapContainer from './Mapcontainer';
import Navigate from './Navigate';
import { Container } from 'native-base';
import io from 'socket.io-client';
import { BackHandler } from 'react-native';    
import {Actions} from 'react-native-router-flux';
import HeaderIcon from './Header/HeaderIcon'
class Home extends Component{

    componentDidMount(){
       
       
        BackHandler.addEventListener('hardwareBackPress', function() {
          BackHandler.exitApp();
        });




        this.props.getCurrentLocation();
        var rx =this;
        let socket = io('http://54.252.173.49:6001');
        let id = AsyncStorage.getItem('user_id')
        console.log(id);
        Promise.resolve(id).then(function(values) {
            console.log(values);
        socket.on('driverChannel:request_trip_'+values+'', (data) => {
            console.log('Home page');
            rx.props.getSocketData(data);
          
                });
               
   
      
    })
}
    componentDidUpdate(prevProps, prevState) {
        if (this.props.requestaccepted == true){
            this.props.requestreceived === {}
            
            Actions.navigater();
        
        }
     
         if(this.props.loggedout == true)
        {
            let keys = ['token', 'user_id'];
                AsyncStorage.multiRemove(keys, (err) => {
                });
                Actions.login({type:'reset'});            
          
        }
       
       
    }
    
    componentWillUnmount() {
      // this.props.cancelRequest();
    }
   
            render(){ 
                const region ={
                    latitude: -36.8485,
                    longitude: 174.7633,
                    latitudeDelta:0.0101,
                    longitudeDelta:0.01,

                }
                
            return(
               
               <View style ={{flex:1,backgroundColor:"rgba(52,52,52,0)"}}>
              <View style ={{flexShrink:2}} >  
              <HeaderIcon/>
               </View>
             
             
                {this.props.region.latitude &&
                <MapContainer region= {this.props.region}
                points ={this.props.points}
                minimum ={this.props.minimum}
                maximum = {this.props.maximum}
                getonlineStatus ={this.props.getonlineStatus}
                online = {this.props.online}
                offline ={this.props.offline}
                requestreceived  = {this.props.requestreceived}
                getDriverRequest = {this.props.getDriverRequest}    
                newrequest = {this.props.newrequest} 
                logout ={this.props.logout}
               
                />
            }
              
               
                 </View>

            );
         
        }
            }
export default Home;