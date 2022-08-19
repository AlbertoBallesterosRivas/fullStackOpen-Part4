const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => {
    return blog.likes;
  });

  return Math.max(...likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
