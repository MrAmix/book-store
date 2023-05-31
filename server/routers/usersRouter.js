const router = require(`express`).Router();
const bookController = require("../controllers/bookController");
const orderController = require("../controllers/orderController");
const UserController = require("../controllers/userController");
const userLoginMiddleware = require("../middleware/UserLoginMiddleware");
router.post(`/:id/baskets`, UserController.createBasket);

//router.delete(`/:id/delete`, bookController.delete);
//router.put(`/:id/update`, bookController.update);

router.post(`/login`, userLoginMiddleware, UserController.login);

router.post(`/registration`, UserController.registration);
router.get(`/:id/orders`, UserController.getOrders);
router.get(`/auth`, UserController.check);
router.get(`/:id`);

module.exports = router;
