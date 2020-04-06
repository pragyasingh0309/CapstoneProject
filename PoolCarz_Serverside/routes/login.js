var express = require('express');
var router = express.Router();
var UsersList = require('./../models/UsersSchema');

/* GET home page. */
router.post('/', function (req, res, next) {
  var creds = req.body;
  UsersList.find(function (err, doc) {
    //console.log("doc", typeof doc)
    for (let i = 0; i < doc.length; i++) {
      // console.log('inside for', doc[i])
      if (doc[i].username == creds.userName && doc[i].password == creds.password) {
        //console.log('creds matched');
        ret = {
          message: "Login successful", status: 200
        }
        // console.log(ret)
        res.send(ret);
      }
    }
    err = new Error("Credential Mismatch");
    next(err);
  });
});

module.exports = router;
