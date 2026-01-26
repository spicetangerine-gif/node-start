//
console.time("time check");
for (let i = 1; i <= 100000; i++) {}
console.timeEnd("time check");

console.log(`hello, Choi!`);
console.error("Error 발생!");

const ary = [
  { name: "홍길동", age: 20 },
  { name: "김길동", age: 22 },
];
console.table(ary); // 표현식 출력

const company = {
  name: "테크 코리아", // Depth 1
  department: {
    name: "개발부", // Depth 2
    team: {
      name: "프론트엔드팀", // Depth 3
      project: {
        title: "차세대 ERP 시스템", // Depth 4
        lead: {
          name: "김철수", // Depth 5
          role: "시니어 개발자",
        },
      },
    },
  },
};

console.dir(company);
