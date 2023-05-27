const { db } = require("./db")

module.exports = {
    getPosts: async () => {
        const fetchedPosts = await db.collection("posts").get()
        return fetchedPosts.docs
    }
}
