import express from 'express'
const router = express.Router();
import User from "../../models/users/dbUsers.js"
import {getToken} from "../../util.js"
router.route("/register").post(async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password:req.body.password
    })
    await newuser.save(function(err,user){
        if(err){
            console.log("error occured:" + err)
            res.status(401).send({
            msg: "Unable to create user, this may be due to the username or email already being in use"
        })
        } else{
            console.log('successfully added in new user'+user.username)
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                message: "You've successfully registered an account",
                token : getToken(user),
                isAdmin:user.isAdmin
            })
        }
    })
});




router.route("/login").post( async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const at="@"
    let user
    if (req.body.username.includes(at)){
        user = await User.findOne({
        email: req.body.username
    });
        
    } else {
        user = await User.findOne({
                username : req.body.username
            })
    }
      
    if(user){
        if(user.password===req.body.password){
        res.send({
            _id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            message: "You logged in to your account successfully",
            token : getToken(user),
            isAdmin:user.isAdmin
        })
        console.log(user)
    } else{
        res.status(401).send({
            msg: "Unable to login due to invalid credentials"
        })
    }}



    
})

router.route("/logout").get((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    req.logout();
    res.json("you have been logged out")
})


export default router;