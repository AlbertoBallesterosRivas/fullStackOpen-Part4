const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs)
//   })
// })

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// blogsRouter.post("/", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter;
