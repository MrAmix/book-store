const router = require(`express`).Router();
const UserController = require("../controllers/userController");
const userLoginMiddleware = require("../middleware/UserLoginMiddleware");
const userRegistrationMiddleware = require("../middleware/UserRegistrationMiddleware");

router.post(`/:id/baskets`, UserController.createBasket);

router.post(`/login`, userLoginMiddleware, UserController.login);

router.post(
  `/registration`,
  userRegistrationMiddleware,
  UserController.registration
);
router.get(`/:id/orders`, UserController.getOrders);

router.get(`/auth`, UserController.check);
router.get(`/:id`);

module.exports = router;
