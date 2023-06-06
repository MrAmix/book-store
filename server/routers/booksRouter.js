const router = require(`express`).Router();
const bookController = require("../controllers/bookController");
const createBookMiddleware = require("../middleware/CreateBookMiddleware");
const authMiddleware = require("../middleware/AuthMiddleware");
const isAdminMiddleware = require("../middleware/IsAdminMiddleware");

router.delete(`/:id`, bookController.delete);
router.put(`/:id`, bookController.update);
router.get(`/`, isAdminMiddleware(), bookController.getAll);
router.post(`/`, createBookMiddleware, bookController.create);
router.get(`/:id`, bookController.getOne);

module.exports = router;
