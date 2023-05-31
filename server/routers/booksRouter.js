const router = require(`express`).Router();
const bookController = require("../controllers/bookController");

router.delete(`/:id`, bookController.delete);
router.put(`/:id`, bookController.update);
router.get(`/`, bookController.getAll);
router.post(`/`, bookController.create);
router.get(`/:id`, bookController.getOne);

module.exports = router;
