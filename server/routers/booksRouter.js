const router = require(`express`).Router();
const bookController = require("../controllers/bookController");

router.delete(`/:id`);
router.put(`/:id`);
router.get(`/`, bookController.getAll);
router.post(`/`, bookController.create);
router.get(`/:id`, bookController.getOne);

module.exports = router;
