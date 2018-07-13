import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import {View, AsyncStorage,TouchableOpacity,Text,Modal,Button } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {Actions} from 'react-native-router-flux';
import  Icon  from 'react-native-vector-icons/FontAwesome';

export const RatingReview =({submitRating,rating,ratingCompleted})=>{
    
     getRating=(rating)=>{
        console.log(rating)
        ratingCompleted(rating);
    }
    
    function submit(){
        alert("submit")
        const value = AsyncStorage.getItem('token'); 
        submitRating (value);
        Actions.home();
    }
     return (
    <View style = {{flex:1,flexGrow:50,justifyContent:"center",alignItems:"center"}} >
       
                    <Icon name ="user" size={50} color="#000080"/>
                     <Rating
                      type='star'
                      ratingCount={5}
                      imageSize={30}
                      showRating
                      onFinishRating={(rating)=>ratingCompleted(rating)}
                    />

        <View>
        <Button title="Submit" onPress={()=>submit()} color="#000080"/>
        </View>
    </View>
         );
}
export default RatingReview;