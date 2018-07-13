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
        Dimensions,
        Button,
        ActivityIndicator,
        Modal, ToastAndroid,
        AsyncStorage
      } from 'react-native';

    import  Icon  from 'react-native-vector-icons/FontAwesome';
    export default class MyProfile extends Component {


    /* setting state and initializing values */
    constructor()
        {
                    super();
                    this.state=
                    ({
                        profile:{

                        }
                    })
        }
   
/* Component will change the state initialized will be changed in render  */
componentDidMount(){


    fetch('')
    .then((response) => response.json())
      .then((response) => {
       if(response.status="OK"){
         
         
         this.setState({
         //  profile:
           });
           this.setState({
             showindicator:false
           })
          }
          else{
            ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
                }
              
            });
           

}

componentWillUnmount() {

}


render(){
return( 
<View>  


</View>
)
}
}
module.exports = MyProfile;