function sum(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
minus(10, 2);

// 외부모듈에서 사용하기.
module.exports = { sum, minus };
