const router = require("express").Router();
const File = require("../models/File");
const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: "uploads/pdf",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
  limits: {
    filesize: 150000, //150kb
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    const fileSize = parseInt(req.headers["content-length"]);
    checkFileSize(fileSize, cb);
  },
}).single("testpdf");

function checkFileSize(fileSize, cb) {
  console.log(fileSize);
  //to limit filesize
  if (fileSize >= 150000) {
    cb("Error: Images of 150KB only");
  } else {
    return cb(null, true);
  }
}
function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /pdf/; //pattern
  //check ext
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  //check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error:pdf only");
  }
}

router.post("/pdf", (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const newFile = new File({
          name: req.body.name,
          image: {
            data: req.file.filename,
            contentType: "application/pdf",
          },
        });

        const File = newFile
          .save()
          .then(() =>
            res.status(200).json({ message: "PDF Uploaded Successfully" })
          )
          .catch((err) => res.status(400).json(err));
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
