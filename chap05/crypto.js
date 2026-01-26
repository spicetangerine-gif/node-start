// 암호화.
const { rejects } = require("assert");
const crypto = require("crypto");

let passwd = crypto
  .createHash("sha512") // 암호화방식
  .update("pw1234") // 암호화할 평문.
  .digest("base64"); // 인코딩

//console.log(passwd); // 'pw1234' -> 고정값.

// salting 암호화.
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // 예외일 경우.
      if (err) {
        reject(err);
      }
      resolve(buf.toString("base64"));
    });
  });
};

// createSalt() // 성공/ 실패
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));
const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt(); // 임의의 값.

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      plainPassword, // 평문
      salt, // salt값
      100000, // 반복횟수.
      64, // 암호화문의 크기.
      "sha512", // 암호화 방식.
      (err, buf) => {
        if (err) {
          reject(err);
        }
        resolve({ passwd: buf.toString("base64"), salt });
      },
    ); // salt값을 활용 평문 -> 암호화.
  }); // 비동기 -> 동기.
};

createCryptoPassword("pw1234")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
