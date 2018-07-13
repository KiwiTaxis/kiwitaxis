import { combineReducers } from 'redux';
import {HomeReducer as home} from '../routes/Home/module/home';
import {RegisterReducer as register} from '../routes/Register/module/register';
import {reducer as formReducer} from 'redux-form';
import {NotificationReducer as notification} from '../routes/Notification/module/notification';
import {NavigationReducer as navigation} from '../routes/Navigation/module/home';
 export const makeRootReducer= () =>{
	return combineReducers({
		form: formReducer,
		register,
		home,
		notification,
		navigation
	});


}
export default makeRootReducer;