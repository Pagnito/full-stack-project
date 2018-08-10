import axios from "axios";
import { FETCH_USER } from "./types";
import { FETCH_SURVEYS } from "./types";
export const fetchUser = () => {
	return function(dispatch) {
		axios.get("/api/current_user").then(res => dispatch({ type: FETCH_USER, payload: res.data }));
	};
};

export const handleToken = token => {
	return function(dispatch) {
		axios.post("/api/stripe", token).then(res => dispatch({ type: FETCH_USER, payload: res.data }));
	};
};

export const sendOutSurveys = (values, history) => {
	return function(dispatch) {
		history.push("/surveys");
		axios.post("/api/surveys", values).then(res => dispatch({ type: FETCH_USER, payload: res.data }));
	};
};

export const fetchSurveys = () => {
	return function(dispatch) {
		axios.get("/api/surveys").then(res => dispatch({ type: FETCH_SURVEYS, payload: res.data }));
	};
};
//same as ^
/*export const fetchUser = () => {
	return async function(dispatch) {
		const res = await axios.get("/api/current_user");
		dispatch({ type: FETCH_USER, payload: res });
	};
};*/
