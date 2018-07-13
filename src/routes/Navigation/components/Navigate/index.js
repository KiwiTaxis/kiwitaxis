    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     * @flow
     */

    import React, { Component } from 'react';
    import MapView from 'react-native-maps';
    import {View,Text,ActivityIndicator } from 'react-native';
    import styles from './MapStyles.js';
    import {PROVIDER_GOOGLE} from "react-native-maps" 
    import { Marker } from 'react-native-maps';
    import SlidingUpPanel from 'rn-sliding-up-panel'
    import Notification from '../../../Notification/components/index'
    import Fab from '../Fab/Fab';
    import getDirections from 'react-native-google-maps-directions'
    import RatingReview from '../Rating/Rating'

 export const Navigate = ({region,arrived,
  getonlineStatus,
  online,
  offline,
  points,
  newrequest,
  requestreceived,
  requestaccepted,
  getDriverRequest,
  setrating})=>{
       
    

return(
    <View style={styles.container}handlenavigation>
          <Button  onPress={()=> handlenavigation()} />
          <MapView provider = {PROVIDER_GOOGLE}
                            style = { styles.container }
                            showsUserLocation = {true}
                            region = {region}
                            followUserLocation={true}  >
                <MapView.Marker coordinate ={region}/>
                  {points && 
                  <MapView.Polyline coordinates ={points}  />}
                  </MapView>
                <Fab 
                getonlineStatus = {getonlineStatus}
                online = {online} />
              
     </View>

);

};
export default Navigate;








