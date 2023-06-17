const router = require(`express`).Router();
const reviewController = require("../controllers/reviewController");
const createBookMiddleware = require("../middleware/CreateBookMiddleware");
const isAdminMiddleware = require("../middleware/IsAdminMiddleware");

// router.delete(`/:id`, reviewController.delete);
router.put(`/:id`, reviewController.update);
router.get(`/`, reviewController.getAll);
// router.post(`/`, createBookMiddleware, reviewController.create);

module.exports = router;
