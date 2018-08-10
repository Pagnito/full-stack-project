import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
class Dashboard extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map((survey, ind) => {
			return (
				<div key={ind} className="row ">
					<div className="col s12 m10 offset-m1">
						<div className="card white">
							<div className="card-content black-text">
								<span className="card-title">{survey.title}</span>
								<p>{survey.body}</p>
								<p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
							</div>
							<div className="card-action">
								<a>Said Yes: {survey.yes}</a>
								<a>Said No: {survey.no}</a>
							</div>
						</div>
					</div>
				</div>
			);
		});
	}
	render() {
		if (!this.props.surveys) {
			return "Loading...";
		}
		return (
			<div>
				{this.renderSurveys()}
				<div className="fixed-action-btn">
					<Link to="/surveys/new" className="btn-floating btn-large red">
						<i className="large material-icons">add</i>
					</Link>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		surveys: state.surveys
	};
}
export default connect(
	mapStateToProps,
	actions
)(Dashboard);
