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
      Dimensions
    } from 'react-native';
import MapView, {  PROVIDER_GOOGLE  } from 'react-native-maps';
import RetroMapStyle from './MapStyles/RetroMapStyle.json';
import RNGooglePlaces from 'react-native-google-places';
import  Icon  from 'react-native-vector-icons/FontAwesome';

export default class SearchResult extends Component {

/* setting state and initializing values */
constructor(){
super();

this.state =({
text:'..................',
});
      }


      
/* setting state and initializing values */
componentDidMount(){
    RNGooglePlaces.openAutocompleteModal(
    this.state = ({
    text:place.name
    })
    )
    }
}
module.exports = SearchResult;
