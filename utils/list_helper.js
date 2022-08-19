const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likesList = blogs.map((blog) => {
    return blog.likes;
  });

  const maxNumberLikes = Math.max(...likesList);

  const favoriteBlog = blogs.find((blog) => blog.likes === maxNumberLikes);

  const { title, author, likes } = favoriteBlog;

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const authorsList = blogs.map((blog) => {
    return blog.author;
  });

  const blogsperAuthor = authorsList.reduce(function (count, currentValue) {
    return (
      count[currentValue] ? ++count[currentValue] : (count[currentValue] = 1),
      count
    );
  }, {});

  const numbers = Object.values(blogsperAuthor);
  const max = Math.max(...numbers);

  return {
    author: Object.keys(blogsperAuthor).find(
      (key) => blogsperAuthor[key] === max
    ),
    blogs: max,
  };
};

const mostLikes = (blogs) => {
  const authorsList = blogs.map((blog) => {
    return blog.author;
  });
  //console.log(authorsList)
  var uniqueArray = [...new Set(authorsList)];
  //console.log(uniqueArray)
  const authorBlogs = uniqueArray.map((author) => {
    return blogs.filter((blog) => blog.author === author);
  });
  //console.log(authorBlogs)

  const likesPerAuthor = authorBlogs.map((blogsByAuthor) => {
    return {
      likes: blogsByAuthor.reduce(function (sum, blog) {
        return sum + blog.likes;
      }, 0),
      author: blogsByAuthor[0].author,
    };
  });

  const max = Math.max(...likesPerAuthor.map((o) => o.likes));

  return likesPerAuthor.find((likesAndAuthor) => likesAndAuthor.likes === max);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
