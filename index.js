const express = require("express");
const app = express();

app.get("/yo", (req, res) => {
	res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
