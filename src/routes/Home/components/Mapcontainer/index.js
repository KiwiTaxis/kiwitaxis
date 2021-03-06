    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     * @flow
     */

    import React, { Component } from 'react';
    import MapView from 'react-native-maps';
 //   import { Polyline } from 'react-native-maps';
    import {View,Text,ActivityIndicator } from 'react-native';
    import styles from './MapStyles.js';
    import {PROVIDER_GOOGLE} from "react-native-maps" 
    //import { Searchbox }from '../Searchbox';
    //import { SearchModal }from '../SearchModal';
    import { Marker } from 'react-native-maps';
    //import { Fare } from '../Fare/index';
    import SlidingUpPanel from 'rn-sliding-up-panel'
    import Notification from '../../../Notification/components/index'
    import Fab from '../Fab/Fab';
    import Icon from 'react-native-vector-icons/FontAwesome';
   


 export const MapContainer = ({region,logout,getonlineStatus,online,offline,points,newrequest,requestreceived,requestaccepted,getDriverRequest})=>{
        
return(


    <View style={styles.container}>
 
        <MapView provider = {PROVIDER_GOOGLE}
                    style = { styles.container }
                    showsUserLocation = {true}
                    region = {region}
                    followUserLocation={true}  >
         <MapView.Marker coordinate ={region}/>
              
       
       
       {points && <MapView.Polyline
                        coordinates ={points}
                />}
            </MapView>
         

        <Fab getonlineStatus = {getonlineStatus}
             online = {online} logout= {logout}/>
                   
       
       {requestreceived && <Notification newrequest={newrequest}  getDriverRequest ={getDriverRequest}/>}
      
     

    </View>
 
);

};
export default MapContainer;








