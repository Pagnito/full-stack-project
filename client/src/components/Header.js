import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<a href="/auth/google">Login With Google</a>
						</li>
					</ul>
				);
			default:
				return (
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li style={{ margin: " 0 10px" }}>
							<Payments />
						</li>
						<li style={{ margin: " 0 10px" }}>Your credits: {this.props.auth.credits}</li>
						<li>
							<Link to="/surveys">Dashboard</Link>
						</li>
						<li>
							<a href="/api/logout">Log Out</a>
						</li>
					</ul>
				);
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to="/" style={{ marginLeft: "40px" }} className="left brand-logo">
						Emaily
					</Link>

					{this.renderContent()}
				</div>
			</nav>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}
export default connect(mapStateToProps)(Header);
