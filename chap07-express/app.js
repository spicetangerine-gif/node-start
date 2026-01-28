const express = require("express");
const multer = require("multer");
const app = express(); // 인스턴스.
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const pool = require("./db");

// 포트: 3000
const SERVER_PORT = 3000;

// multer 모듈을 활용하기 위한 설정.
const storage = multer.diskStorage({
  // 저장경로.
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  // 파일이름.
  filename: (req, file, cb) => {
    const file_name = Buffer.from(file.originalname, "latin1") //
      .toString("utf-8");
    // 키보드_12131312390.png
    const fn = file_name.substring(0, file_name.indexOf("."));
    const ext = file_name.substring(file_name.indexOf("."));
    cb(null, fn + "_" + Date.now() + ext);
  },
});

const upload = multer({ storage }); // multer 인스턴스.

// public 폴더의 html, css, js url을 통해서 접근.
app.use(express.static("public"));
// json 형태의 데이터 수신 가능. application/json
app.use(express.json());
// form 데이터 수신 가능. application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 라우팅. url : 실행함수.
app.get("/", (req, res) => {
  // 실행할 기능.
  res.send("/ 페이지 호출");
});
// 라우팅 파일.
app.use("/sample", require("./routes/sample.route"));

app.post("/upload", upload.single("user_img"), (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);
  // 경로: public/images 업로드.
  //
  res.json({
    user_name: req.body.user_name,
    user_age: req.body.user_age,
    filename: req.file.filename,
  });
});

// 요청방식(post) , url(/login), req.body의 값.(id, pw)
// pw => 암호화.
// select count(*) as cnt from member where id=? and pw=?
// 조회(1) => retCode:OK, 조회(0) => retCode:NG
app.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;
  // 암호화 비번.
  let passwd = crypto.createHash("sha512").update(user_pw).digest("base64");
  let [result, sec] = await pool.query(
    "select count(*) as cnt from member where user_id=? and user_pw=?",
    [user_id, passwd],
  );
  // 응답.
  if (result.length > 0) {
    res.json({
      retCode: "OK",
      name: result[0].user_name,
      role: result[0].responsibility,
    });
  } else {
    res.json({ retCode: "NG" });
  }
});

// 삭제.
app.delete("/delete/:id", async (req, res) => {
  const uid = req.params.id;
  // 서버의 파일 삭제.
  const [data, rows] = await pool.query(
    "select user_img from member where user_id = ?",
    [uid],
  );
  // 이미지삭제.
  if (result[0].affectedRows) {
    // 삭제된 회원의 이미지도 같이 지워주기.
    const ufile = path.join(__dirname, "public/images", data[0].user_img);

    fs.unlike(ufile, (err) => {
      if (err) {
        console.log(`${ufile} 삭제중 에러.`);
      } else {
        console.log(`${ufile} 샂제 완료.`);
      }
    });
    (res, json({ retCode: "OK" }));
  } else {
    res.json({ retCode: "NG" });
  }
});

// 회원목록.
app.get("/list", async (req, res) => {
  let [result, sec] = await pool.query(
    "select * from member where responsibility = 'User'",
  );
  res.json(result);
});

// 회원추가.
app.post("/create", upload.single("user_img"), async (req, res) => {
  const { user_id, user_pw, user_nm } = req.body;
  const file_name = req.file ? req.file.filename : null; // 업로드 파일
  // 암호화 비번.
  let passwd = crypto.createHash("sha512").update(user_pw).digest("base64");

  try {
    // db 입력.
    let result = await pool.query(
      "insert into member(user_id,user_pw,user_name,user_img) values(?,?,?,?)",
      [user_id, passwd, user_nm, file_name],
    );
    // 반환결과.
    res.json({ retCode: "OK" });
  } catch (err) {
    // 업로드된 이미지 삭제 처리.
    const ufile = path.join(__dirname, "public/images", file_name);
    fs.unlink(ufile, (err) => {
      if (err) {
        console.log(`파일 삭제중 error => ${err}`);
      } else {
        console.log(`파일 삭제 완료 => ${ufile}`);
      }
    });
    res.json({ retCode: "NG", retMsg: err.sqlMessage });
  }
});

// 실행.
app.listen(SERVER_PORT, () => {
  console.log(`서버실행 http://localhost:${SERVER_PORT}`);
});
