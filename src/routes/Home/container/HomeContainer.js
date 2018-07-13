import {connect} from 'react-redux';
import Home from  "../components/Home";
import {bindActionCreators} from 'redux';

import  { getCurrentLocation,
		 getonlineStatus,
		 getSocketData,
		 getDriverRequest,
		 logout,
		cancelRequest} from '../module/home';

const mapStatetoProps=(state)=>({
	region:state.home.region,
	online : state.home.online,
	offline: state.home.offline,
	requestreceived :state.home.requestreceived,
	requestaccepted :state.home.requestaccepted,
	trip_id : state.home.trip_id || {},
	newrequest :state.home.newrequest,
	loggedout :state.home.loggedout,
	
});


const mapDispatchToProps =(dispatch) =>{
return bindActionCreators({getCurrentLocation,
	getonlineStatus,
	getSocketData,
	getDriverRequest,
	logout,
	cancelRequest
},dispatch);
	
}
export default connect(mapStatetoProps,mapDispatchToProps)(Home)


