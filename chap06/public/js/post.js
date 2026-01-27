// post.js
//http://localhost:3001/index
//http://localhost:3001/posts
fetch("http://localhost:3001/reviews?reviewId=2")
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

fetch("http://localhost:3001/reviews", {
  method: "POST",
  body: JSON.stringify({
    reviewId: "4",
    writer: "최길동",
  }),
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});
