const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname) || ".pdf");
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|png|jpeg|jpg/i.test(file.mimetype) || file.originalname.match(/\.(pdf|png|jpg|jpeg)$/i);
  if (allowed) cb(null, true);
  else cb(new Error("Only PDF, PNG, JPG allowed"), false);
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
