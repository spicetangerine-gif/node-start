const express = require("express");
const boardRoute = require("./routes/board.route");
const PORT = 3000;

const app = express(); // Express 인스턴스 생성.

app.get("/", (req, res) => {
  console.log("/ root directory");
  res.send("/ Server 실행.");
});

app.use("/board", boardRoute); // 라우팅정보.

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
