// fs.js
// 파일생성, 기록, 읽기 기능. -> 동기, 비동기 방식.
const fs = require("fs");

// 비동기방식.
fs.readFile(
  "./path.js", // 읽을 파일
  "utf-8", // 인코딩.
  (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  }, // 실행할 callback함수.
);

// 동기방식.
const txt = fs.readFileSync("./process.js", "utf-8");
console.log(txt);

console.log("end");
