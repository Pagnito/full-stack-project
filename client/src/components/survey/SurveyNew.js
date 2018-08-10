import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./surveyReview";
class SurveyNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showReview: false
		};
	}
	renderContent() {
		if (this.state.showReview === false) {
			return <SurveyForm onSurvSubmit={() => this.setState({ showReview: true })} />;
		}
		return <SurveyReview onCancel={() => this.setState({ showReview: false })} />;
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: "surveyForm",
	destroyOnUnmount: true
})(SurveyNew);
