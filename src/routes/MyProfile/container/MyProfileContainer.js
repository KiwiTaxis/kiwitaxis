import {connect} from 'react-redux';
import MyProfile from  "../MyProfile";
import {bindActionCreators} from 'redux';
import  { 
 } from '../module/profile';

const mapStatetoProps=(state)=>({
	profile:state.profile.profile,
	
	});


const mapDispatchToProps =(dispatch) =>{
return bindActionCreators({
	getUserProfile

 

},dispatch);

}
export default connect(mapStatetoProps,mapDispatchToProps)(MyProfile)


