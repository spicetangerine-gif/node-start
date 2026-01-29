const xlsx = require("xlsx");
const pool = require("../db");
const crypto = require("crypto");
const workbook = xlsx.readFile("../uploads/엑셀연습1.xlsx");
const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트명.
const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트.

const result = xlsx.utils.sheet_to_json(firstSheet);

result.forEach((elem) => {
  console.log(elem);
  let passwd = crypto
    .createHash("sha512")
    .update("" + elem.password)
    .digest("base64");

  pool.query(
    `insert into member (user_id, user_pw, user_name)
    values(?,?,?)`,
    [elem.user_id, passwd, elem.user_name],
    (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log("입력=> ", data);
    },
  );
});
