const router = require(`express`).Router();
const UserController = require("../controllers/userController");
const BasketController = require("../controllers/basketController");
const userLoginMiddleware = require("../middleware/UserLoginMiddleware");
const userRegistrationMiddleware = require("../middleware/UserRegistrationMiddleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../storage");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}.${file.mimetype.split("/")[1]}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(new Error("Не поддерживающийся формат"), false);
    }

    cb(null, true);
  },
});

router.post(`/:id/baskets`, UserController.createBasket);
router.put(`/:id/baskets/:basketId`, UserController.addBookBasket);
router.get(`/:id/baskets/:basketId/books`, BasketController.getBooks);
router.delete(
  `/:id/baskets/:basketId/books/:bookId`,
  BasketController.deleteBook
);

router.delete(`/:id/baskets/:basketId`, UserController.deleteBasket);

router.post(`/login`, userLoginMiddleware, UserController.login);

router.post(
  `/registration`,
  userRegistrationMiddleware,
  UserController.registration
);
router.get(`/auth`, UserController.check);

router.get(`/:id/orders`, UserController.getOrders);
router.post(`/:id/orders`, UserController.createOrder);
router.get(`/:id`);
router.put(`/:id`, upload.single("avatar"), UserController.update);

module.exports = router;
