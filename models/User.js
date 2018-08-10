const mongoose = require("mongoose");
//const surveys = require("./surveys");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	haha: { type: String, default: "haha" }
});

mongoose.model("users", userSchema);
