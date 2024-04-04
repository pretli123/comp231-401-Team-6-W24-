const express = require("express");
const router = express.Router();
const UserRegistration = require("../models/userSchema.js");
const bcrypt = require("bcrypt");

router.post('/signup', async (req, res) => {

  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);


  const signnUpUser = new UserRegistration({
    email: req.body.email,
    password:securePassword
})
  signnUpUser.save()
  .then(data =>{
    res.json(data)
  })
  .catch(error=>{
    res.json(error)
  })
})

router.get('/signin')
module.exports = router;