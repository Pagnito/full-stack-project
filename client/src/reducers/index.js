import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import surveysReducer from "./surveys-reducer";
import { reducer as reduxForm } from "redux-form";
export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer
});
