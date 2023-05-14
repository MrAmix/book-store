const router = require(`express`).Router();
const bookController = require("../controllers/bookController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");

router.get(`/:id/baskets`, userController.baskets);
router.get(`/:id/books`, bookController.book);

router.post(`/login`, userController.login);

router.post(`/registration`, userController.registration);
router.get(`/:id/orders`, orderController.order);
router.get(`/auth`, userController.check);
router.get(`/:id`);

module.exports = router;
