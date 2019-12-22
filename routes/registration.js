const {
    User,
    validate
} = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const path = require('path');

router.post('/', async (req, res) => {
    console.log(req.body);

    let userExist = await User.findOne({
        email: req.body.registerEmail
    });
    if (userExist) return res.status(400).send('User already registered.');

    let loginTaken = await User.findOne({
        login: req.body.login
    });
    if (loginTaken) return res.status(400).send('Login taken.');

    
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email
    });

    try{    //walidacja danych 
        user.validate(async (err)=>{
            if(err){
                console.log("Chyba brak hasla");
                res.status(400).send("Cos poszlo nie tak cos z haslem :)");
            }
            else{ //Gdy dane są poprawne hashujemy i zapisujemy dane do bazy
                const salt=await bcrypt.genSalt(10);
                user.password=await bcrypt.hash(user.password,salt);
                await user.save(); 
                res.send(user);
                
            }
        })
    }
    catch(ex){
        res.send(ex.message);
    }

    // const {
    //     validationError
    // } = validate(req.body);
    // if (validationError) return res.status(400).send(validationError.details[0].message);
    


    //  const token = user.generateAuthToken();
    // res.header('x-auth-token', token).send([user._id, user.login, user.email]);
    
});

module.exports = router;

