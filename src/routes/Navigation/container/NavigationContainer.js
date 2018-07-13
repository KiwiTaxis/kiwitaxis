import {connect} from 'react-redux';
import Navigation from  "../components/Navigation";
import {bindActionCreators} from 'redux';

import  { getCurrentLocation,
	finishtrip,
	getonlineStatus,
	getSocketData,
	getDriverRequest,
	getarrivalstatus,
	submitRating,
	ratingCompleted
	} from '../module/home';

const mapStatetoProps=(state)=>({
	region:state.navigation.region,
	online : state.navigation.online,
	offline: state.navigation.offline,
	requestreceived :state.navigation.requestreceived,
	requestaccepted :state.navigation.requestaccepted,
	trip_id : state.navigation.trip_id || {},
	newrequest :state.navigation.newrequest ,
	points : state.navigation.points,
	arrived: state.navigation.arrived,
	startrip:state.navigation.startrip,
	changedregion: state.navigation.changedregion,
	setrating: state.navigation.setrating,
	finishedtrip :state.navigation.finishedtrip,
	rating:state.navigation.rating ||{}
});


const mapDispatchToProps =(dispatch) =>{
return bindActionCreators({getCurrentLocation,
	getonlineStatus,
	getSocketData,
	getDriverRequest,
	getarrivalstatus,
	finishtrip,
	submitRating,
	ratingCompleted
},dispatch);

}
export default connect(mapStatetoProps,mapDispatchToProps)(Navigation)


