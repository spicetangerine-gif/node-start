const router = require("express").Router();
const ctrl = require("../controllers/board.controller");

// 목록, 추가, 삭제 라우팅을 생성하세요.
router.get("/:id", ctrl.list);

router.post("/", ctrl.create);

router.delete("/:id", ctrl.remove);

module.exports = router;
