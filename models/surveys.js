const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecipientsSchema = require("./recipients");
const surveySchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [RecipientsSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	dateSent: Date,
	lastResponded: Date
});
mongoose.model("surveys", surveySchema);
