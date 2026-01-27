// 파일의 경로, 확장자, 파일명.
const path = require("path");

console.log(__dirname); // 실행 폴더.
console.log(__filename); // 실행 파일.

console.log(path.basename(__filename, ".js")); // 파일명.

// path.format
