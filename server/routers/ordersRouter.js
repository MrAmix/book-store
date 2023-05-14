const router = require(`express`).Router();
const OrderController = require("../controllers/orderController");

router.get(`/:id`, OrderController.order);

module.exports = router;
