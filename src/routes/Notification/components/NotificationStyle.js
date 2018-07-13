import  {Dimensions}  from 'react-native';


var {height,width} = Dimensions.get('window');
const styles ={
Notification:{
width:width,
position: 'absolute',
top: 0,
flex:1,
width:width/2,
height:height,
width:width,
position:"absolute",
backgroundColor: "rgba(0,0,0,0.9)"
},
icon:{
height: height/4,
top: height/3-50,
width:width/2,
left:width/4,
backgroundColor:"white",

},
rider:{
            
            justifyContent :"center",
            width:width,
//left:width/2,
            top:height/2-50,
            flexDirection :'column'
          },

button:{
  
     
    top: height/2,
    width:width,
    alignItems:"center",
    width:width,
    
      },accept:{
  
        position:"absolute",
        top: 20,
        width:width,
      
       
        
          },
     
          accept:{
              color:"white",
              fontSize : 25,
            
              
          },
         
          riderinformation:{
            fontSize: 15,
            
            //top:height/8,
            color:"white"
           
          },
          address:{
            color:"#fff",
            fontSize:10
          }
} 
export default styles;


