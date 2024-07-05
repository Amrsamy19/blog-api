const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

mongoose.connect(process.env.DATABASE_CONNECT_STRING);

const blogSchema = {
	title: String,
	content: String,
};

const Blog = mongoose.model("Blog", blogSchema);

app.get("/blogs", (req, res) => {
	Blog.find()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

app.get("/blogs/:blogTitle", (req, res) => {
	Blog.find({ title: req.params.blogTitle })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

app.post("/blogs", (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	const blog = new Blog({
		title: title,
		content: content,
	});
	blog
		.save()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

app.delete("/blogs", (req, res) => {
	const title = req.body.title;
	Blog.deleteOne({ title: title }, (err, blog) => {
		if (err) {
			res.send(err);
		} else {
			res.send("blog deleted!");
		}
	});
});

app.listen(3000, () => {
	console.log("listening on http://localhost:3000");
});
