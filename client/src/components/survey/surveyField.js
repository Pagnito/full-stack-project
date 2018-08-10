import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input style={{ marginBottom: "5px" }} {...input} />
			<div style={{ marginBottom: "20px" }} className="red-text">
				{touched && error}
			</div>
		</div>
	);
};
