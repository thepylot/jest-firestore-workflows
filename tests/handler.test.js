const { handler } = require("../handler");
const  { db } = require("../services/db");
const { faker } = require("@faker-js/faker");
const request = require('supertest');

function postsGenerator() {
    let posts = []
    const postTitles = Array.from({length: 5}, (_) => faker.random.word())
    postTitles.forEach(title => {
        posts.push(
            {
                title: title,
                timestamp: new Date(),
            }
            );
    })
    return posts;
  }

afterEach( async () => {
    await db
    .collection('posts')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });
}, 30000)

describe('GET /posts', () => {
    it('GET /posts => retrieve posts', async () => {
        const posts = postsGenerator()
        const queryPromises = []
        posts.forEach((createdPost) => {
            queryPromises.push(db.collection("posts").doc().set(createdPost))
        })
        await Promise.all(queryPromises);

        return await request(handler)
        .get('/posts')
        .expect('Content-Type', /json/)
        .expect(200).then(response => {
            expect(response.body.posts.length).toEqual(5)
        })
    });
});