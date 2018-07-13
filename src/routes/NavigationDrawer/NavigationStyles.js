import  {Dimensions}  from 'react-native';


var {height,width} = Dimensions.get('window');
const styles ={
    imagesection:{
        flex:1,
        backgroundColor:"#fff",
        height: height/3
    },
    options:{
        flex:1,
        justifyContent:"space-between"
        }
}
export default styles;


