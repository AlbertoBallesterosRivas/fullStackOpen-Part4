const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Title test 1",
    author: "Autor test 1",
    url: "www.urltest1.com",
    likes: 1,
  },
  {
    title: "Title test 2",
    author: "Autor test 2",
    url: "www.urltest2.com",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there is one blog", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});



describe('addition of a new blog', () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Title test",
      author: "Autor test",
      url: "www.urltest.com",
      likes: 1,
    };
  
    const responsePost = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    const response = await api.get("/api/blogs");
  
    const contents = response.body.map((r) => r.content);
  
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(responsePost.body.title).toContain("Title test");
  });
  
  test("blog without likes will default to the value 0", async () => {
    const newBlog = {
      title: "Title test",
      author: "Autor test",
      url: "www.urltest.com",
    };
  
    const responsePost = await api.post("/api/blogs").send(newBlog).expect(201);
  
    const response = await api.get("/api/blogs");
  
    expect(responsePost.body.likes).toEqual(0);
  });
  
  test("if the title and url properties are missing the backend responds with 400 Bad Request", async () => {
    const newBlog = {
      author: "Autor test",
      likes: 1,
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
})

describe('deletion of a blog', () => {
  test("a blog can be deleted", async () => {
    const initialResponse = await api.get("/api/blogs");
  
    await api.delete(`/api/blogs/${initialResponse.body[0].id}`);
  
    const afterDeleteResponse = await api.get("/api/blogs");
  
    expect(afterDeleteResponse.body).toHaveLength(initialBlogs.length - 1);
  });
  
  test("the backend responds with 204 when deleting a blog", async () => {
    const response = await api.get("/api/blogs");
  
    await api.delete(`/api/blogs/${response.body[0].id}`).expect(204);
  });
})

afterAll(() => {
  mongoose.connection.close();
});
