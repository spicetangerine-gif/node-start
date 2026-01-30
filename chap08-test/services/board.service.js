// 서비스 영역.
const pool = require("../db");

const svc = {
  list: async function (id = "") {
    let [rows, result] = await pool.query(
      "select * from board_tbl where id = ?",
      [id],
    );

    return rows;
  },

  create: async function (data = {}) {
    const { title, content, writer } = data;
    let result = await pool.query(
      "insert into board_tbl(title,content,writer) values(?,?,?)",
      [title, content, writer],
    );
    return result[0].insertId;
  },

  remove: async function (id = "") {
    let result = await pool.query("delete from board_tbl where id = ?", [id]);

    console.log(result);
    return result;
  },
};

module.exports = svc;
