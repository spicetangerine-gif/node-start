const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/test/:msg", (req, res) => {
  // test.txt 작성.
  fs.writeFile("../test.txt", req.params.msg, "utf-8", (err, buf) => {
    // err: 예외, buf: 정상처리.
    if (err) {
      console.log(err);
      return;
    }
    console.log(buf);
  });
  res.send("/test 페이지 호출");
});
// http://localhost:3000/read => test.txt의 내용으로 콘솔에 출력.
router.get("/read", (req, res) => {
  fs.readFile("../test.txt", "utf-8", (err, buf) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(buf);
  });
  // client 화면에 출력되는 값.
  //res.send("/read");
  res.redirect("/sample");
});
// http://localhost:3000/sample => sample.html 화면출력.
router.get("/sample", (req, res) => {
  // 비동기 처리.
  fs.readFile("./sample1.html", "utf-8", (err, buf) => {
    if (err) {
      console.log(err);
      res.status(501).send(err);
    }
    console.log(buf);
    res.sendStatus(200).send(buf);
  });
  // 200:정상, 404:페이지없음. 500:에러값.
});

module.exports = router;
