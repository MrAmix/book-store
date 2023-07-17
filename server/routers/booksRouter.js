const router = require(`express`).Router();
const bookController = require("../controllers/bookController");
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
//const createBookMiddleware = require("../middleware/CreateBookMiddleware");
//const authMiddleware = require("../middleware/AuthMiddleware");
//const isAdminMiddleware = require("../middleware/IsAdminMiddleware");

router.get(`/`, bookController.getAll);
router.get(`/:id`, bookController.getOne);
router.delete(`/:id`, bookController.delete);
router.put(`/:id`, upload.single("preview"), bookController.update);
router.post(`/`, upload.single("preview"), bookController.create);
router.post(`/:id/reviews`, bookController.createReview);

module.exports = router;
