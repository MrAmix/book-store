const router = require(`express`).Router();
const bookController = require("../controllers/bookController");
const createBookMiddleware = require("../middleware/CreateBookMiddleware");
const authMiddleware = require("../middleware/AuthMiddleware");
const isAdminMiddleware = require("../middleware/IsAdminMiddleware");

router.get(`/`, bookController.getAll);
router.get(`/:id`, bookController.getOne);
router.delete(`/:id`, bookController.delete);
router.put(`/:id`, bookController.update);
router.post(`/`, createBookMiddleware, bookController.create);

module.exports = router;
