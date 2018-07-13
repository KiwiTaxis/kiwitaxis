    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     * @flow
     */

    import React, { Component } from 'react';
    import MapView from 'react-native-maps';
    import {View,Text,ActivityIndicator } from 'react-native';
    import styles from './MapStyle.js';
    import {PROVIDER_GOOGLE} from "react-native-maps" 
    import { Marker } from 'react-native-maps';
    import SlidingUpPanel from 'rn-sliding-up-panel'
    import Notification from '../../../Notification/components/index'
    import Options from '../Options/Options';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import getDirections from 'react-native-google-maps-directions';
    import RatingReview from '../Rating/Rating';
 
    export const MapNavigate = ({region,
  arrived,
  getonlineStatus,
  starttrip,
  changedregion,
  online,
  offline,
  points,
  newrequest,
  requestreceived,
  requestaccepted,
  getDriverRequest,
  getarrivalstatus,
  finishtrip,
  setrating,
  submitRating,
  ratingCompleted,
  rating})=>{
       
       //const value = false
        setInterval(() => {
     const value = true
        }, 1000); 
        const value = false

        function handlenavigation()
        {
         const data = {
             source: {
              latitude: -33.8356372,
              longitude: 18.6947617
            },
            destination: {
              latitude: -33.8600024,
              longitude: 18.697459
            },
            params: [
              {
                key: "travelmode",
                value: "driving"        // may be "walking", "bicycling" or "transit" as well
              },
              {
                key: "dir_action",
                value: "navigate"       // this instantly initializes navigation using the given travel mode 
              }
            ]
          }
          getDirections(data)
        }
       // var Spinner = require('react-native-spinkit');
        
return(
<View style={styles.container}>
   <View>
      <Text> Username </Text>
      <Icon name="location-arrow" 
      style={styles.icon} 
      onPress = {() =>handlenavigation()}>
      </Icon>
  </View>
            <MapView provider = {PROVIDER_GOOGLE}
            style = { styles.container }
            showsUserLocation = {true}
            region = {region}
            followUserLocation={true} 
            toolbarEnabled = {true} 
            animateToRegion = {changedregion}>
            {region ?
            <MapView.Marker coordinate ={region}/> 
            :<MapView.Marker coordinate ={region}/>
            } 
            {points && <MapView.Polyline
             coordinates ={points} />
            }
            </MapView>
            <Options 
            getonlineStatus = {getonlineStatus} 
            getarrivalstatus={getarrivalstatus}
            online = {online} arrived={arrived}
            starttrip ={starttrip} 
            finishtrip={finishtrip}/>
           {setrating == true && <RatingReview 
           submitRating = {submitRating} 
           ratingCompleted={ratingCompleted}
           rating ={rating}/>}
   
  </View>

);

};
export default MapNavigate;








