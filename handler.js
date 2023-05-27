const express = require("express");
const { getPosts } = require("./services/posts");
var handler = express()

handler.get("/posts", async (req, res) => {
    const posts = await getPosts();

    return res.status(200).json({
        posts: posts
    });
});

module.exports = {
    handler: handler
}