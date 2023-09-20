const USER = require('../model/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



// Login-User

exports.loginUser = async function (req, res, next) {

    try {
        
        const user = await USER.findOne({ email: req.body.email });

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            const token = jwt.sign({ userId: user._id }, "RANDOM-TOKEN");     // create JWT token
            res.status(200).json({                                          //return success response
                status: "Success",
                msg: "User Login Successfully",
                user: user,
                token: token
            });
        } else {
            res.status(400).json({
                msg: "Password does not Match"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Found",
            data: error
        });
    }
}


//add user

exports.addUser = async(req, res, next) =>{
    try {

        req.body.password = await bcrypt.hash( req.body.password , 10);
        const addUser = await USER.create(req.body);
        const token = jwt.sign({ userId: addUser._id }, "RANDOM-TOKEN");     // create JWT token
        res.status(201).json({                                            //return success response
            status: "Success",
            msg: "User Add Successfully",
            user: addUser,
            token: token
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "User not Added",
            data: error
        });
    }
}

exports.getAllUser = async(req, res, next) =>{
    try {

        const user = await USER.find();

        res.status(200).json({                                         
            status: "Success",
            msg: "User find Successfully",
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Users not founded",
            data: error
        });
    }
}