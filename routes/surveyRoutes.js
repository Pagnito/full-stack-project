const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/mailer");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const surveyTemplate = require("../services/email-templates/surveyTemplate");
const Survey = mongoose.model("surveys");
module.exports = app => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const userSurveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
		res.send(userSurveys);
	});
	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		res.send("thanks for your feedback");
	});

	app.post("/api/surveys/webhooks", (req, res) => {
		const p = Path.createPath("/api/surveys/:surveyId/:choice");
		const events = _.map(req.body, event => {
			const match = p.test(new URL(event.url).pathname);
			if (match) {
				return {
					email: event.email,
					surveyId: match.surveyId,
					choice: match.choice
				};
			}
		});
		_.chain(events)
			.compact()
			.uniqBy("email", "surveyId")
			.each(event => {
				Survey.updateOne(
					{
						_id: event.surveyId,
						recipients: {
							$elemMatch: { email: event.email, responded: false }
						}
					},
					{
						$inc: { [event.choice]: 1 },
						$set: { "recipients.$.responded": true },
						lastResponded: newDate()
					}
				).exec();
			})
			.value();

		res.send({});
	});
	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(",").map(email => {
				return { email: email.trim() };
			}),
			_user: req.user.id,
			dateSent: Date.now()
		});
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
