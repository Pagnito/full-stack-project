import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./surveyField";
import validateEmails from "../../utils/validateEmails";
class SurveyForm extends Component {
	renderFields() {
		return (
			<div>
				<Field label="Title" type="text" name="title" component={SurveyField} />
				<Field label="Subject" type="text" name="subject" component={SurveyField} />
				<Field label="Body" type="text" name="body" component={SurveyField} />
				<Field label="Recipients List" type="text" name="recipients" component={SurveyField} />
			</div>
		);
	}
	render() {
		return (
			<div style={{ marginTop: "20px" }} className="container">
				<form autoComplete="off" on onSubmit={this.props.handleSubmit(this.props.onSurvSubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="btn waves-effect waves-light  red lighten-1" type="submit">
						Back
					</Link>
					<button className="btn waves-effect waves-light right  red lighten-1" type="submit">
						Submit<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}
function validate(values) {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || "");
	if (!values.title) {
		errors.title = "You must provide a title";
	}
	if (!values.subject) {
		errors.subject = "You must provide a subject line";
	}
	if (!values.body) {
		errors.body = "You must provide your survey body";
	}
	if (!values.recipients) {
		errors.recipients = "You must provide a list of recipients";
	}

	return errors;
}
export default reduxForm({
	form: "surveyForm",
	validate: validate,
	destroyOnUnmount: false
})(SurveyForm);
