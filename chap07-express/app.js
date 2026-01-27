const express = require("express");
const multer = require("multer");
const app = express(); // 인스턴스.

const pool = require("./db");

// 포트: 3000
const SERVER_PORT = 3000;

// multer 모듈을 활용하기 위한 설정.
const storage = multer.diskStorage({
  // 저장경로
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  // 파일이름.
  filename: (req, file, cb) => {
    const file_name = Buffer.from(file.originalname, "latin1") //
      .toString("utf-8");
    // 키보드_1221314124.png
    const fn = file_name.substring(0, file_name.indexOf("."));
    const ext = file_name.substring(file_name.indexOf("."));
    cb(null, fn + "_" + Date.now() + ext);
  },
});

const upload = multer({ storage }); // multer 인스턴스.

// public 폴더의 html, css, js url을 통해서 접근.
app.use(express.static("public"));

// 라우팅. url : 실행함수.
app.get("/", (req, res) => {
  //실행할 기능.
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

// 회원추가.
app.post("/create", upload.single("user_img"), async (req, res) => {
  const { user_id, user_pw, user_nm } = req.body;
  const file_name = req.file.filename;
  // db 입력.
  let result = await pool.query(
    "insert into member(user_id,user_pw,user_name,user_img) values(?,?,?,?)",
    [user_id, user_pw, user_nm, file_name],
  );
});

// 실행.
app.listen(SERVER_PORT, () => {
  console.log(`서버실행 http://localhost:${SERVER_PORT}`);
});
