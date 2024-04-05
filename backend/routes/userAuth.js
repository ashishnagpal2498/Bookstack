// Author - Yogish Honnadevipura Gopalakrishna
const express = require('express');

// const multer = require('multer');
// const upload = multer({dest:'uploads/'});

const lateFeeController = require('../controllers/usersAuth.js');
const multer = require('../middlware/multer.js');

const router = express.Router();
router.post('/create', lateFeeController.createNewUser);
router.post("/login", lateFeeController.loginUser);
router.post("/resetlink", lateFeeController.sendMailUpdatePassword);
router.post("/updatepassword", lateFeeController.resetPassword);
router.post("/deleteuser", lateFeeController.deleteUser);
router.post("/getuserinfo", lateFeeController.getUserData);
router.post("/updatepicture",  multer.single('picture'), lateFeeController.updateUserpicture);
// router.put("/updatepicture", upload.single('picture'), lateFeeController.updateUserpicture);
router.put("/updateprofile", lateFeeController.updateUser);

module.exports = router;