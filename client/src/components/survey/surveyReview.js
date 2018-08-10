import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
function SurveyReview(props) {
	return (
		<div className="container">
			<h4>Please Confirm Your Entries</h4>
			<div style={{ borderBottom: "1px solid black", margin: "10px" }}>
				<label>Survey Title</label>
				<div>{props.formVals.title}</div>
			</div>
			<div style={{ borderBottom: "1px solid black", margin: "10px" }}>
				<label>Subject</label>
				<div>{props.formVals.subject}</div>
			</div>
			<div style={{ borderBottom: "1px solid black", margin: "10px" }}>
				<label>Body</label>
				<div>{props.formVals.body}</div>
			</div>
			<div style={{ borderBottom: "1px solid black", margin: "10px" }}>
				<label>Recipients</label>
				<div>{props.formVals.recipients}</div>
			</div>

			<button style={{ marginTop: "15px" }} onClick={props.onCancel} className="btn waves-effect waves-light left  red lighten-1">
				Back
			</button>
			<button
				onClick={() => props.sendOutSurveys(props.formVals, props.history)}
				style={{ marginTop: "15px" }}
				className="btn waves-effect waves-light right  red lighten-1"
				type="submit"
			>
				Send<i className="material-icons right">send</i>
			</button>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		formVals: state.form.surveyForm.values
	};
}
export default connect(
	mapStateToProps,
	actions
)(withRouter(SurveyReview));
