const router = require(`express`).Router();
const authorController = require("../controllers/authorController");

router.get(`/`, authorController.getAll);
router.post("/", authorController.create);

module.exports = router;
