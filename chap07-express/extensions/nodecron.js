require("dotenv").config({ path: "../.env" });
const cron = require("node-cron");
const transporter = require("./nodemailer");

const cron_job = cron.schedule(
  "* * * 1 * *",
  () => {
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: "ssangfi77@naver.com",
        subject: "cron연습",
        text: "메일 발송 연습",
      },
      (err) => {
        if (err) {
          console.log("발송에러");
        }
        console.log("발송완료");
      },
    );
    console.log("메일발송시작");
  },
  {
    schedule: false,
  },
);
// start() 호출.
cron_job.start();
cron_job.stop();
module.exports = cron_job;
