import {StyleSheet} from 'react-native'
import {Dimensions} from 'react-native'


const styles = {
	container:{
        
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		height: '100%',
   		width :'100%',
      
	},
	map:{
		...StyleSheet.absoluteFillObject
	},
	icon:{
		color:"#000080",
		left:150,
	fontSize:20,
width:20	},
navigater:{
	height:40,

}
}
export default styles;