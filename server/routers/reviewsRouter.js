const router = require(`express`).Router();
const reviewController = require("../controllers/reviewController");
const createBookMiddleware = require("../middleware/CreateBookMiddleware");
const isAdminMiddleware = require("../middleware/IsAdminMiddleware");

router.put(`/:id`, reviewController.update);
router.get(`/`, reviewController.getAll);

module.exports = router;
