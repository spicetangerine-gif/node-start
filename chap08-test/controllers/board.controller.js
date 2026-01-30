// 컨트롤러 영역.
const svc = require("../services/board.service");

const ctrl = {
  list: async (req, res) => {
    const page = req.params.page;
    const rows = await svc.list(page);
    res.send(rows);
  },
  create: async (req, res) => {
    const { title, content, writer } = req.body;
    const param = req.body;
    console.log(param);
    const result = await svc.create({ title, content, writer });
    res.send(result);

    if (result) {
      res.json({ retCode: "OK" });
    } else {
      res.json({ retCode: "NG" });
    }
  },
  remove: async (req, res) => {
    const id = req.params.id;
    let result = await svc.remove(id);
    console.log(`${result} controller`);
    if (result) {
      res.json({ retCode: "OK" });
    } else {
      res.json({ retCode: "NG" });
    }
  },
};

module.exports = ctrl;
