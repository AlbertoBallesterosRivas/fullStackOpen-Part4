const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likesList = blogs.map(blog => {
    return blog.likes;
  });

  const maxNumberLikes = Math.max(...likesList);

  const favoriteBlog = blogs.find(blog => blog.likes === maxNumberLikes);

  const {title, author, likes} = favoriteBlog;

  return {title, author, likes};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
