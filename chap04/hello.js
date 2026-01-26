// hello.js
// 자바스크립트는 웹브라우저에서 실행.
// js 실행환경 => Node.js
const { sum, minus } = require("./module");

function nodeFnc() {
  console.log(`hello Node!`);
}
nodeFnc();

console.log(minus(10, 20));
