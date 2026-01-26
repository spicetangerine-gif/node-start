const fs = require("fs");
const { Console } = require("console");
const { setInterval } = require("timers/promises");

// stream을 활용해서 file생성.
const output = fs.createWriteStream("./output/stdout.log", { flags: "a" }); // 쓰기전용 파일 생성.
const errOutput = fs.createWriteStream("./output/error.log", { flags: "a" }); // 쓰기전용 파일 생성.

const logger = new Console({ stdout: output, stderr: errOutput }); // 일반로그, 에러 =>
logger.log("[" + new Date() + "] hello, world"); // 서버의 실행이력 로그형식 출력.
logger.error("error log"); // 서버의 실행에러 이력 에러형식  출력.

let count = 1;
const job = setInterval(() => {
  logger.log(`현재 카운트는 [${count}]`);
  if (count > 10) {
    clearInterval(job);
  }
  count++;
}, 1000);
