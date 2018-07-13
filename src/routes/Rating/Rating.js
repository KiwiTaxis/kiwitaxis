import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import {View, AsyncStorage,TouchableOpacity,Text,Modal,Button } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {Actions} from 'react-native-router-flux';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import request from '../../util/request';
  export default class Ratingreview extends Component {
  constructor(props) { super(props) ; 
this.state={ 
  isVisible: true,
  rating: 1 } }
  componentDidMount(){

   
 

  }

  ratingCompleted(rating) {
    this.setState({rating:rating})
    console.log(rating)
    }
  submitrating=()=>{
    
    Actions.home();
   
  }

 
  render() {  

  return (
        <View style = {{flex:1,justifyContent:"center",alignContent:"center",backgroundColor:"transparent"}} >
      
                   
                      <View style = {{flex:1,alignItems:"center",backgroundColor:"transparent"}} >
                      <Icon name ="user" size={50} color="#000080"/>
                    <Rating
                      type='star'
                      ratingCount={5}
                      imageSize={60}
                      showRating
                      onFinishRating={this.ratingCompleted}
                    />
      </View>
   <View>
    <Button title="Submit" onPress={this.submitrating} color="#000080"/>
    </View>
    
    
    <Text>
     
    </Text>
  </View>
);
} }