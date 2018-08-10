const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function(emails) {
	var invalidEmails = emails
		.split(",")
		.map(email => email.trim())
		.filter(email => regex.test(email) === false);
	if (invalidEmails.length) {
		return `These Emails are invalid: ${invalidEmails}`;
	}
	return;
}
