const router = require(`express`).Router();
const OrderController = require("../controllers/orderController");

router.get(`/`, OrderController.getAll);
router.delete(`/:id`, OrderController.delete);
router.get(`/:id`, OrderController.getOne);

module.exports = router;
